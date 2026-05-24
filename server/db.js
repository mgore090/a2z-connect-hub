import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

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

export async function initializeDatabase() {
  console.log('[DB] Connecting to MySQL server to verify database status...');
  let connection;
  try {
    connection = await mysql.createConnection(connectionConfig);
  } catch (err) {
    console.error('\n================================================================');
    console.error('❌ DATABASE CONNECTION ERROR!');
    console.error(`Could not connect to MySQL at ${DB_HOST}:${DB_PORT} as user "${DB_USER}".`);
    console.error('Please verify that:');
    console.error(' 1. The MySQL service is running locally on your machine.');
    console.error(' 2. The credentials in "server/.env" are correct.');
    console.error(`Error details: ${err.message}`);
    console.error('================================================================\n');
    throw err;
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

    // 3. Create Tables
    console.log('[DB] Initializing database tables...');

    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) DEFAULT 'mgore',
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
    console.log('[DB] Seeding default user "mgore"...');
    await pool.query(
      'INSERT INTO users (id, username, avatar, xp, active_role) VALUES (1, "mgore", "M", 380, "gen-ai")'
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

// Helper query function for index.js
export async function query(sql, params) {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initializeDatabase first.');
  }
  return pool.query(sql, params);
}
