const PostgreSQLClient = require("../config/postgres-client");

const migration = {
  adminType: `
    DO $$ 
    BEGIN 
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
        CREATE TYPE role AS ENUM ('admin', 'user');
      END IF;
    END $$;
  `,
  language: `
    CREATE TABLE IF NOT EXISTS languages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      position INTEGER NOT NULL
    );
  `,
  admin: `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(128) NOT NULL,
      username VARCHAR(64) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role role NOT NULL DEFAULT 'admin',
      createdAt TIMESTAMP DEFAULT NOW(),
      updateAt TIMESTAMP
    );
  `,
};

async function run() {
  try {
    let db = new PostgreSQLClient();
    for (let [key, query] of Object.entries(migration)) {
      console.log(`Running migration: ${key}`);
      await db.query(query); // Asinxron bajarish
    }
    console.log("All migrations completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
  }
}

run();
