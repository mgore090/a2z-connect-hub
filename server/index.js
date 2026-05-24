import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase, query } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// ----------------------------------------------------
// USER PROGRESS ENDPOINTS
// ----------------------------------------------------

// GET /api/user - Fetch user statistics and syllabus completion
app.get('/api/user', async (req, res) => {
  try {
    const [userRows] = await query('SELECT * FROM users WHERE id = 1');
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = userRows[0];

    // Fetch completed topics
    const [topicRows] = await query('SELECT topic_id FROM completed_topics WHERE user_id = 1');
    const completedTopics = {};
    topicRows.forEach(row => {
      completedTopics[row.topic_id] = true;
    });

    // Fetch lab achievements
    const [achievementRows] = await query('SELECT lab_id FROM lab_achievements WHERE user_id = 1');
    const labAchievements = achievementRows.map(row => row.lab_id);

    res.json({
      username: user.username,
      avatar: user.avatar,
      xp: user.xp,
      active_role: user.active_role,
      completedTopics,
      labAchievements
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST /api/user/xp - Adjust user experience points
app.post('/api/user/xp', async (req, res) => {
  const { xpChange } = req.body;
  if (xpChange === undefined) {
    return res.status(400).json({ error: 'Missing xpChange in body' });
  }

  try {
    await query('UPDATE users SET xp = xp + ? WHERE id = 1', [xpChange]);
    const [userRows] = await query('SELECT xp FROM users WHERE id = 1');
    res.json({ success: true, xp: userRows[0].xp });
  } catch (err) {
    console.error('Error updating XP:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

// POST /api/user/completed-topic - Check / Uncheck syllabus topic completion
app.post('/api/user/completed-topic', async (req, res) => {
  const { topicId, topicTitle, isCompleted } = req.body;
  if (!topicId) {
    return res.status(400).json({ error: 'Missing topicId in body' });
  }

  try {
    if (isCompleted) {
      await query(
        'INSERT INTO completed_topics (user_id, topic_id, topic_title) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE topic_title = topic_title',
        [topicId, topicTitle || topicId]
      );
    } else {
      await query('DELETE FROM completed_topics WHERE user_id = 1 AND topic_id = ?', [topicId]);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error toggling topic completion:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

// POST /api/user/active-role - Change selected role
app.post('/api/user/active-role', async (req, res) => {
  const { roleId } = req.body;
  if (!roleId) {
    return res.status(400).json({ error: 'Missing roleId in body' });
  }

  try {
    await query('UPDATE users SET active_role = ? WHERE id = 1', [roleId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error changing active role:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

// POST /api/user/achievement - Add a lab achievement
app.post('/api/user/achievement', async (req, res) => {
  const { labId } = req.body;
  if (!labId) {
    return res.status(400).json({ error: 'Missing labId in body' });
  }

  try {
    await query(
      'INSERT INTO lab_achievements (user_id, lab_id) VALUES (1, ?) ON DUPLICATE KEY UPDATE lab_id = lab_id',
      [labId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error inserting lab achievement:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

// POST /api/user/reset - Reset progress to clean slate
app.post('/api/user/reset', async (req, res) => {
  try {
    await query('UPDATE users SET xp = 380, active_role = "gen-ai" WHERE id = 1');
    await query('DELETE FROM completed_topics WHERE user_id = 1');
    await query('DELETE FROM lab_achievements WHERE user_id = 1');
    await query('DELETE FROM bookings WHERE user_id = 1');

    // Re-seed original default completed topics
    const defaultTopics = [
      { id: "llm-apis", title: "API Integrations & Parameters" },
      { id: "vector-search", title: "Text Embeddings & Vector DB Indexing" },
      { id: "linear-algebra", title: "Linear Algebra & Optimization for ML" },
      { id: "classical-ml", title: "Supervised Classification & Regression" },
      { id: "zero-few-shot", title: "Zero-Shot vs. Few-Shot In-Context Learning" },
      { id: "dockerize-ml", title: "Containerizing FastAPI Models with Docker" }
    ];

    for (const topic of defaultTopics) {
      await query(
        'INSERT INTO completed_topics (user_id, topic_id, topic_title) VALUES (1, ?, ?)',
        [topic.id, topic.title]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error resetting user progress:', err);
    res.status(500).json({ error: 'Database reset failed' });
  }
});

// ----------------------------------------------------
// DISCUSSION BOARD (FORUM) ENDPOINTS
// ----------------------------------------------------

// GET /api/forum - Fetch all discussions with nested replies
app.get('/api/forum', async (req, res) => {
  try {
    const [posts] = await query('SELECT * FROM forum_posts ORDER BY created_at DESC');
    const [replies] = await query('SELECT * FROM forum_replies ORDER BY created_at ASC');

    const postsWithReplies = posts.map(post => ({
      id: post.id,
      title: post.title,
      author: post.author,
      avatar: post.avatar,
      category: post.category,
      time: post.created_at, // Map sql timestamp directly or format on client
      content: post.content,
      votes: post.votes,
      voted: false, // In a robust multi-user app we would check a post_upvotes relation table
      replies: replies
        .filter(reply => reply.post_id === post.id)
        .map(reply => ({
          author: reply.author,
          avatar: reply.avatar,
          content: reply.content,
          time: reply.created_at
        }))
    }));

    res.json(postsWithReplies);
  } catch (err) {
    console.error('Error fetching forum:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST /api/forum/post - Create a new post
app.post('/api/forum/post', async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ error: 'Missing title, category, or content' });
  }

  try {
    const [result] = await query(
      'INSERT INTO forum_posts (title, author, avatar, category, content) VALUES (?, "mgore (You)", "M", ?, ?)',
      [title, category, content]
    );
    const newPostId = result.insertId;
    
    const [insertedRows] = await query('SELECT * FROM forum_posts WHERE id = ?', [newPostId]);
    const post = insertedRows[0];

    res.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        author: post.author,
        avatar: post.avatar,
        category: post.category,
        time: post.created_at,
        content: post.content,
        votes: post.votes,
        voted: true,
        replies: []
      }
    });
  } catch (err) {
    console.error('Error creating forum post:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

// POST /api/forum/post/:id/vote - Toggle upvotes on a post
app.post('/api/forum/post/:id/vote', async (req, res) => {
  const postId = req.params.id;
  const { change } = req.body; // Expects 1 or -1
  if (change === undefined) {
    return res.status(400).json({ error: 'Missing change in body' });
  }

  try {
    await query('UPDATE forum_posts SET votes = votes + ? WHERE id = ?', [change, postId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error upvoting forum post:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

// POST /api/forum/post/:id/reply - Write a reply to a post
app.post('/api/forum/post/:id/reply', async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Missing content in body' });
  }

  try {
    await query(
      'INSERT INTO forum_replies (post_id, author, avatar, content) VALUES (?, "mgore (You)", "M", ?)',
      [postId, content]
    );

    res.json({
      success: true,
      reply: {
        author: "mgore (You)",
        avatar: "M",
        content: content,
        time: new Date()
      }
    });
  } catch (err) {
    console.error('Error writing forum reply:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

// ----------------------------------------------------
// EXPERT CONSULTING BOOKINGS ENDPOINTS
// ----------------------------------------------------

// GET /api/bookings - Fetch user bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await query('SELECT * FROM bookings WHERE user_id = 1 ORDER BY booked_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST /api/bookings - Book an expert session slot
app.post('/api/bookings', async (req, res) => {
  const { expertId, expertName, slot } = req.body;
  if (!expertId || !expertName || !slot) {
    return res.status(400).json({ error: 'Missing expertId, expertName, or slot in body' });
  }

  try {
    await query(
      'INSERT INTO bookings (user_id, expert_id, expert_name, slot) VALUES (1, ?, ?, ?)',
      [expertId, expertName, slot]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error booking slot:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

// ----------------------------------------------------
// STUDY ROOM MESSAGES ENDPOINTS
// ----------------------------------------------------

// GET /api/study/rooms/:roomId/messages - Fetch chat log
app.get('/api/study/rooms/:roomId/messages', async (req, res) => {
  const { roomId } = req.params;
  try {
    const [rows] = await query('SELECT * FROM study_messages WHERE room_id = ? ORDER BY created_at ASC', [roomId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching study room messages:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST /api/study/rooms/:roomId/messages - Send peer chat message
app.post('/api/study/rooms/:roomId/messages', async (req, res) => {
  const { roomId } = req.params;
  const { text, author } = req.body;
  if (!text || !author) {
    return res.status(400).json({ error: 'Missing text or author in body' });
  }

  try {
    const [result] = await query(
      'INSERT INTO study_messages (room_id, author, text) VALUES (?, ?, ?)',
      [roomId, author, text]
    );
    const newMessageId = result.insertId;

    const [insertedRows] = await query('SELECT * FROM study_messages WHERE id = ?', [newMessageId]);
    res.json(insertedRows[0]);
  } catch (err) {
    console.error('Error sending study room message:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

// ----------------------------------------------------
// SERVER BOOTSTRAPPING
// ----------------------------------------------------
async function startServer() {
  try {
    // 1. Initialise database and seed default entries
    await initializeDatabase();

    // 2. Start Express Listener
    app.listen(PORT, () => {
      console.log(`\n=============================================================`);
      console.log(`🚀 A2Z CONNECT HUB FULL-STACK BACKEND STARTED SUCCESSFULLY!`);
      console.log(`📡 Listening at http://localhost:${PORT}`);
      console.log(`=============================================================\n`);
    });
  } catch (err) {
    console.error('Failed to initialize database or start Express server:', err.message);
    process.exit(1);
  }
}

startServer();
