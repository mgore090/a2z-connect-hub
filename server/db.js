import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'a2z_connect_hub'
} = process.env;

// Create connection config
const connectionConfig = {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
};

let pool;
let isVirtualDb = false;

// In-Memory Virtual Database Store
const virtualStore = {
  users: [],
  completed_topics: [],
  lab_achievements: [],
  forum_posts: [],
  forum_replies: [],
  bookings: [],
  study_messages: []
};

export async function initializeDatabase() {
  console.log('[DB] Connecting to MySQL server to verify database status...');
  let connection;
  try {
    connection = await mysql.createConnection(connectionConfig);
  } catch (err) {
    console.warn('\n================================================================');
    console.warn('⚠️ DATABASE CONNECTION FAILED! (Using Virtual Database Fallback)');
    console.warn(`Could not connect to MySQL at ${DB_HOST}:${DB_PORT} as user "${DB_USER}".`);
    console.warn('Backend server will now load a high-speed IN-MEMORY VIRTUAL DATABASE.');
    console.warn('All routing, signups, progress saves, and Q&A logs will remain fully');
    console.warn('functional for this session. Wiping/re-starting boots a clean slate.');
    console.warn('================================================================\n');
    
    isVirtualDb = true;
    await seedVirtualDatabase();
    return;
  }

  try {
    // 1. Create database if not exists
    console.log(`[DB] Creating database "${DB_NAME}" if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.end();

    // 2. Establish connection pool to the database
    pool = mysql.createPool({
      ...connectionConfig,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log(`[DB] Connected to database pool for "${DB_NAME}".`);

    // Resiliency: check if old schema exists and drop tables if necessary to upgrade clean auth
    try {
      const [cols] = await pool.query("SHOW COLUMNS FROM users LIKE 'email'");
      if (cols.length === 0) {
        console.log('[DB] Old database schema detected (missing email). Dropping old tables to recreate clean authentication schemas...');
        await pool.query('DROP TABLE IF EXISTS completed_topics, lab_achievements, bookings, study_messages, forum_replies, forum_posts, users;');
      }
    } catch (e) {
      // Users table probably does not exist yet, which is expected on clean install!
    }

    // 3. Create Tables
    console.log('[DB] Initializing database tables...');

    // Users Table (Auth version)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        avatar VARCHAR(10) DEFAULT 'M',
        xp INT DEFAULT 380,
        active_role VARCHAR(100) DEFAULT 'gen-ai'
      ) ENGINE=InnoDB;
    `);

    // Completed Topics
    await pool.query(`
      CREATE TABLE IF NOT EXISTS completed_topics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        topic_id VARCHAR(100) UNIQUE,
        topic_title VARCHAR(255) NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // Lab Achievements
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lab_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        lab_id VARCHAR(100) UNIQUE,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // Forum Posts
    await pool.query(`
      CREATE TABLE IF NOT EXISTS forum_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        avatar VARCHAR(10) NOT NULL,
        category VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        votes INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // Forum Replies
    await pool.query(`
      CREATE TABLE IF NOT EXISTS forum_replies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        author VARCHAR(100) NOT NULL,
        avatar VARCHAR(10) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // Expert Bookings
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        expert_id VARCHAR(100) NOT NULL,
        expert_name VARCHAR(100) NOT NULL,
        slot VARCHAR(100) NOT NULL,
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // Study Room Messages
    await pool.query(`
      CREATE TABLE IF NOT EXISTS study_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        room_id VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    console.log('[DB] Database tables successfully created or already exist.');

    // 4. Seed initial data
    await seedDatabase();

  } catch (err) {
    console.error(`[DB] Error during database initialization: ${err.message}`);
    throw err;
  }
}

async function seedDatabase() {
  console.log('[DB] Checking if data seeding is required...');

  // 1. Seed user if empty
  const [userRows] = await pool.query('SELECT * FROM users LIMIT 1');
  if (userRows.length === 0) {
    console.log('[DB] Seeding default authenticated user "mgore"...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    await pool.query(
      'INSERT INTO users (id, username, email, password_hash, avatar, xp, active_role) VALUES (1, "mgore", "mgore@a2z.com", ?, "M", 380, "gen-ai")',
      [hashedPassword]
    );

    // Seed completed topics matching frontend default
    const defaultTopics = [
      { id: "llm-apis", title: "API Integrations & Parameters" },
      { id: "vector-search", title: "Text Embeddings & Vector DB Indexing" },
      { id: "linear-algebra", title: "Linear Algebra & Optimization for ML" },
      { id: "classical-ml", title: "Supervised Classification & Regression" },
      { id: "zero-few-shot", title: "Zero-Shot vs. Few-Shot In-Context Learning" },
      { id: "dockerize-ml", title: "Containerizing FastAPI Models with Docker" }
    ];

    for (const topic of defaultTopics) {
      await pool.query(
        'INSERT INTO completed_topics (user_id, topic_id, topic_title) VALUES (1, ?, ?)',
        [topic.id, topic.title]
      );
    }
    console.log('[DB] Default user and completed topics successfully seeded.');
  }

  // 2. Seed forum posts if empty
  const [postRows] = await pool.query('SELECT * FROM forum_posts LIMIT 1');
  if (postRows.length === 0) {
    console.log('[DB] Seeding default forum posts and replies...');

    // Post 1
    await pool.query(
      `INSERT INTO forum_posts (id, title, author, avatar, category, content, votes, created_at)
       VALUES (1,
               "Trouble with Backpropagation gradients in Lab 3 (Neural Net Churn)",
               "mgore (You)",
               "M",
               "ML Theory",
               "I am writing the PyTorch manual SGD weights update. When I run \`W1 -= learning_rate * dW1\`, my BCE loss is decreasing, but is there a risk of gradient exploding if my learning rate is set too high (e.g. 10.0)? Or should I add a gradient clipping function?",
               12,
               DATE_SUB(NOW(), INTERVAL 2 HOUR))`
    );
    await pool.query(
      `INSERT INTO forum_replies (post_id, author, avatar, content, created_at)
       VALUES (1,
               "Striver (Guru)",
               "S",
               "Yes! A learning rate of 10.0 is extremely high and will cause weights to overshoot, resulting in NaN losses due to mathematical overflow (exploding gradient). Always set learning rates between 0.001 and 0.1 for backpropagation. If you must use high rates, definitely implement gradient clipping via \`np.clip(dW1, -1.0, 1.0)\` to keep updates bounded.",
               DATE_SUB(NOW(), INTERVAL 1 HOUR))`
    );

    // Post 2
    await pool.query(
      `INSERT INTO forum_posts (id, title, author, avatar, category, content, votes, created_at)
       VALUES (2,
               "Why does HNSW index lookup speed beat Flat L2 Search in Pinecone?",
               "cyber_learner",
               "C",
               "Gen-AI RAG",
               "I am comparing flat cosine similarity lookup with an HNSW graph index. When indexing 10 million vectors, HNSW queries under 10ms but the flat linear search takes 800ms. Syntactically, how does the highway skip-list structure achieve this speed?",
               28,
               DATE_SUB(NOW(), INTERVAL 1 DAY))`
    );
    await pool.query(
      `INSERT INTO forum_replies (post_id, author, avatar, content, created_at)
       VALUES (2,
               "Love Babbar",
               "L",
               "HNSW builds a multi-layered graph where the top layer has few connections (for long-distance skips) and base layers have dense clusters (for near searches). It behaves like a Skip-List data structure but applied to vectors. Lookups are O(log N) rather than O(N) linear scans!",
               DATE_SUB(NOW(), INTERVAL 18 HOUR))`
    );

    // Post 3
    await pool.query(
      `INSERT INTO forum_posts (id, title, author, avatar, category, content, votes, created_at)
       VALUES (3,
               "Docker Multi-stage building failing with requirements.txt missing",
               "deploy_master",
               "D",
               "MLOps",
               "In my production multi-stage Dockerfile, stage 1 compiles the wheels but stage 2 fails because it can't find \`requirements.txt\`. Should I copy the dependencies list across both compilation blocks?",
               8,
               DATE_SUB(NOW(), INTERVAL 3 DAY))`
    );
    await pool.query(
      `INSERT INTO forum_replies (post_id, author, avatar, content, created_at)
       VALUES (3,
               "Matrix-Ops (Guru)",
               "⚙️",
               "Exactly. The runtime container does not inherit any workspace files unless explicitly copied. You should write: \`COPY requirements.txt .\` in both the builder stage and the production runner stage, or just copy the pre-compiled wheels directly using: \`COPY --from=builder /root/.cache/pip /root/.cache/pip\` to run local installation.",
               DATE_SUB(NOW(), INTERVAL 2 DAY))`
    );

    console.log('[DB] Forum posts and replies successfully seeded.');
  }

  console.log('[DB] Seeding check complete.');
}

// ----------------------------------------------------
// VIRTUAL DATABASE ENGINE & SEEDER
// ----------------------------------------------------
async function seedVirtualDatabase() {
  console.log('[VIRTUAL DB] Seeding initial mock data...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  virtualStore.users.push({
    id: 1,
    username: 'mgore',
    email: 'mgore@a2z.com',
    password_hash: hashedPassword,
    avatar: 'M',
    xp: 380,
    active_role: 'gen-ai'
  });

  const defaultTopics = [
    { id: "llm-apis", title: "API Integrations & Parameters" },
    { id: "vector-search", title: "Text Embeddings & Vector DB Indexing" },
    { id: "linear-algebra", title: "Linear Algebra & Optimization for ML" },
    { id: "classical-ml", title: "Supervised Classification & Regression" },
    { id: "zero-few-shot", title: "Zero-Shot vs. Few-Shot In-Context Learning" },
    { id: "dockerize-ml", title: "Containerizing FastAPI Models with Docker" }
  ];

  defaultTopics.forEach(topic => {
    virtualStore.completed_topics.push({
      id: virtualStore.completed_topics.length + 1,
      user_id: 1,
      topic_id: topic.id,
      topic_title: topic.title,
      completed_at: new Date()
    });
  });

  // Seed default forum posts
  virtualStore.forum_posts.push({
    id: 1,
    title: "Trouble with Backpropagation gradients in Lab 3 (Neural Net Churn)",
    author: "mgore (You)",
    avatar: "M",
    category: "ML Theory",
    content: "I am writing the PyTorch manual SGD weights update. When I run `W1 -= learning_rate * dW1`, my BCE loss is decreasing, but is there a risk of gradient exploding if my learning rate is set too high (e.g. 10.0)? Or should I add a gradient clipping function?",
    votes: 12,
    created_at: new Date(Date.now() - 2 * 3600000)
  });
  virtualStore.forum_replies.push({
    id: 1,
    post_id: 1,
    author: "Striver (Guru)",
    avatar: "S",
    content: "Yes! A learning rate of 10.0 is extremely high and will cause weights to overshoot, resulting in NaN losses due to mathematical overflow (exploding gradient). Always set learning rates between 0.001 and 0.1 for backpropagation. If you must use high rates, definitely implement gradient clipping via `np.clip(dW1, -1.0, 1.0)` to keep updates bounded.",
    created_at: new Date(Date.now() - 3600000)
  });

  virtualStore.forum_posts.push({
    id: 2,
    title: "Why does HNSW index lookup speed beat Flat L2 Search in Pinecone?",
    author: "cyber_learner",
    avatar: "C",
    category: "Gen-AI RAG",
    content: "I am comparing flat cosine similarity lookup with an HNSW graph index. When indexing 10 million vectors, HNSW queries under 10ms but the flat linear search takes 800ms. Syntactically, how does the highway skip-list structure achieve this speed?",
    votes: 28,
    created_at: new Date(Date.now() - 24 * 3600000)
  });
  virtualStore.forum_replies.push({
    id: 2,
    post_id: 2,
    author: "Love Babbar",
    avatar: "L",
    content: "HNSW builds a multi-layered graph where the top layer has few connections (for long-distance skips) and base layers have dense clusters (for near searches). It behaves like a Skip-List data structure but applied to vectors. Lookups are O(log N) rather than O(N) linear scans!",
    created_at: new Date(Date.now() - 18 * 3600000)
  });

  virtualStore.forum_posts.push({
    id: 3,
    title: "Docker Multi-stage building failing with requirements.txt missing",
    author: "deploy_master",
    avatar: "D",
    category: "MLOps",
    content: "In my production multi-stage Dockerfile, stage 1 compiles the wheels but stage 2 fails because it can't find `requirements.txt`. Should I copy the dependencies list across both compilation blocks?",
    votes: 8,
    created_at: new Date(Date.now() - 3 * 24 * 3600000)
  });
  virtualStore.forum_replies.push({
    id: 3,
    post_id: 3,
    author: "Matrix-Ops (Guru)",
    avatar: "⚙️",
    content: "Exactly. The runtime container does not inherit any workspace files unless explicitly copied. You should write: `COPY requirements.txt .` in both the builder stage and the production runner stage, or just copy the pre-compiled wheels directly using: `COPY --from=builder /root/.cache/pip /root/.cache/pip` to run local installation.",
    created_at: new Date(Date.now() - 2 * 24 * 3600000)
  });

  console.log('[VIRTUAL DB] Seed completed successfully!');
}

async function runVirtualQuery(sql, params) {
  const sqlClean = sql.trim().replace(/\s+/g, ' ');
  const sqlLower = sqlClean.toLowerCase();

  // 1. Users Queries
  if (sqlLower.startsWith('select * from users')) {
    if (sqlLower.includes('where id = ?')) {
      const id = params[0];
      const match = virtualStore.users.find(u => u.id === id);
      return [match ? [match] : [], {}];
    }
    if (sqlLower.includes('where email = ?')) {
      const email = params[0];
      const match = virtualStore.users.find(u => u.email === email);
      return [match ? [match] : [], {}];
    }
    return [virtualStore.users, {}];
  }

  if (sqlLower.startsWith('insert into users')) {
    const username = params[0];
    const email = params[1];
    const password_hash = params[2];
    const newUser = {
      id: virtualStore.users.length + 1,
      username,
      email,
      password_hash,
      avatar: username.charAt(0).toUpperCase(),
      xp: 0,
      active_role: 'gen-ai'
    };
    virtualStore.users.push(newUser);
    return [{ insertId: newUser.id }, {}];
  }

  if (sqlLower.startsWith('update users set xp = xp + ?')) {
    const xpChange = params[0];
    const userId = params[1];
    const user = virtualStore.users.find(u => u.id === userId);
    if (user) {
      user.xp = Math.max(0, user.xp + xpChange);
    }
    return [{ affectedRows: 1 }, {}];
  }

  if (sqlLower.startsWith('update users set active_role = ?')) {
    const roleId = params[0];
    const userId = params[1];
    const user = virtualStore.users.find(u => u.id === userId);
    if (user) {
      user.active_role = roleId;
    }
    return [{ affectedRows: 1 }, {}];
  }

  if (sqlLower.startsWith('update users set xp = 0, active_role = "gen-ai"')) {
    const userId = params[0];
    const user = virtualStore.users.find(u => u.id === userId);
    if (user) {
      user.xp = 0;
      user.active_role = 'gen-ai';
    }
    return [{ affectedRows: 1 }, {}];
  }

  // 2. Completed Topics Queries
  if (sqlLower.startsWith('select topic_id from completed_topics')) {
    const userId = params[0];
    const topics = virtualStore.completed_topics.filter(t => t.user_id === userId);
    return [topics, {}];
  }

  if (sqlLower.startsWith('insert into completed_topics')) {
    const userId = params[0];
    const topicId = params[1];
    const topicTitle = params[2];
    const existing = virtualStore.completed_topics.find(t => t.user_id === userId && t.topic_id === topicId);
    if (!existing) {
      virtualStore.completed_topics.push({
        id: virtualStore.completed_topics.length + 1,
        user_id: userId,
        topic_id: topicId,
        topic_title: topicTitle,
        completed_at: new Date()
      });
    }
    return [{ affectedRows: 1 }, {}];
  }

  if (sqlLower.startsWith('delete from completed_topics')) {
    if (sqlLower.includes('where user_id = ? and topic_id = ?')) {
      const userId = params[0];
      const topicId = params[1];
      virtualStore.completed_topics = virtualStore.completed_topics.filter(
        t => !(t.user_id === userId && t.topic_id === topicId)
      );
    } else {
      const userId = params[0];
      virtualStore.completed_topics = virtualStore.completed_topics.filter(t => t.user_id !== userId);
    }
    return [{ affectedRows: 1 }, {}];
  }

  // 3. Lab Achievements Queries
  if (sqlLower.startsWith('select lab_id from lab_achievements')) {
    const userId = params[0];
    const achievements = virtualStore.lab_achievements.filter(a => a.user_id === userId);
    return [achievements, {}];
  }

  if (sqlLower.startsWith('insert into lab_achievements')) {
    const userId = params[0];
    const labId = params[1];
    const existing = virtualStore.lab_achievements.find(a => a.user_id === userId && a.lab_id === labId);
    if (!existing) {
      virtualStore.lab_achievements.push({
        id: virtualStore.lab_achievements.length + 1,
        user_id: userId,
        lab_id: labId,
        completed_at: new Date()
      });
    }
    return [{ affectedRows: 1 }, {}];
  }

  if (sqlLower.startsWith('delete from lab_achievements')) {
    const userId = params[0];
    virtualStore.lab_achievements = virtualStore.lab_achievements.filter(a => a.user_id !== userId);
    return [{ affectedRows: 1 }, {}];
  }

  // 4. Forum Queries
  if (sqlLower.startsWith('select * from forum_posts')) {
    const sortedPosts = [...virtualStore.forum_posts].sort((a, b) => b.created_at - a.created_at);
    return [sortedPosts, {}];
  }

  if (sqlLower.startsWith('select * from forum_replies')) {
    const sortedReplies = [...virtualStore.forum_replies].sort((a, b) => a.created_at - b.created_at);
    return [sortedReplies, {}];
  }

  if (sqlLower.startsWith('insert into forum_posts')) {
    const title = params[0];
    const author = params[1];
    const avatar = params[2];
    const category = params[3];
    const content = params[4];
    const newPost = {
      id: virtualStore.forum_posts.length + 1,
      title,
      author,
      avatar,
      category,
      content,
      votes: 1,
      created_at: new Date()
    };
    virtualStore.forum_posts.push(newPost);
    return [{ insertId: newPost.id }, {}];
  }

  if (sqlLower.startsWith('update forum_posts set votes = votes + ?')) {
    const voteChange = params[0];
    const postId = parseInt(params[1]);
    const post = virtualStore.forum_posts.find(p => p.id === postId);
    if (post) {
      post.votes = post.votes + voteChange;
    }
    return [{ affectedRows: 1 }, {}];
  }

  if (sqlLower.startsWith('insert into forum_replies')) {
    const postId = parseInt(params[0]);
    const author = params[1];
    const avatar = params[2];
    const content = params[3];
    const newReply = {
      id: virtualStore.forum_replies.length + 1,
      post_id: postId,
      author,
      avatar,
      content,
      created_at: new Date()
    };
    virtualStore.forum_replies.push(newReply);
    return [{ affectedRows: 1 }, {}];
  }

  // 5. Bookings Queries
  if (sqlLower.startsWith('select * from bookings')) {
    const userId = params[0];
    const bookings = virtualStore.bookings.filter(b => b.user_id === userId);
    bookings.sort((a, b) => b.booked_at - a.booked_at);
    return [bookings, {}];
  }

  if (sqlLower.startsWith('insert into bookings')) {
    const userId = params[0];
    const expertId = params[1];
    const expertName = params[2];
    const slot = params[3];
    virtualStore.bookings.push({
      id: virtualStore.bookings.length + 1,
      user_id: userId,
      expert_id: expertId,
      expert_name: expertName,
      slot: slot,
      booked_at: new Date()
    });
    return [{ affectedRows: 1 }, {}];
  }

  if (sqlLower.startsWith('delete from bookings')) {
    const userId = params[0];
    virtualStore.bookings = virtualStore.bookings.filter(b => b.user_id !== userId);
    return [{ affectedRows: 1 }, {}];
  }

  // 6. Study Rooms Queries
  if (sqlLower.startsWith('select * from study_messages')) {
    const roomId = params[0];
    const messages = virtualStore.study_messages.filter(m => m.room_id === roomId);
    messages.sort((a, b) => a.created_at - b.created_at);
    return [messages, {}];
  }

  if (sqlLower.startsWith('insert into study_messages')) {
    const roomId = params[0];
    const author = params[1];
    const text = params[2];
    const newMsg = {
      id: virtualStore.study_messages.length + 1,
      room_id: roomId,
      author,
      text,
      created_at: new Date()
    };
    virtualStore.study_messages.push(newMsg);
    return [newMsg, {}];
  }

  console.log('[VIRTUAL DB] Unhandled SQL Command:', sql);
  return [[], {}];
}

// Resilient query runner
export async function query(sql, params) {
  if (isVirtualDb) {
    return runVirtualQuery(sql, params);
  }
  if (!pool) {
    throw new Error('Database pool not initialized. Call initializeDatabase first.');
  }
  return pool.query(sql, params);
}
