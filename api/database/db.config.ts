import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

import type { QueryResultRow } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

class Database {
  static async query<T extends QueryResultRow>(sql: string, values: any[] = []): Promise<T[]> {
    try {
      const result = await pool.query<T>(sql, values);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  static async closePool() {
    await pool.end();
  }
}

export default Database;
