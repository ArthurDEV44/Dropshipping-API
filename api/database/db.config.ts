import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dropship_database',
  password: 'Orleans45*',
  port: 5432,
});

class Database {
  static async query(sql: string, values: any[]) {
    const result = await pool.query(sql, values);
    return result;
  }
}

export default Database;
