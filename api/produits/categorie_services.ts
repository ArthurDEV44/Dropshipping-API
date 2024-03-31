import Database from '../database/db.config';

export default class CategorieService {
  async creerCategorie(nom: string, description: string) {
    const { rows } = await Database.query(
      'INSERT INTO categories (nom, description) VALUES ($1, $2) RETURNING *',
      [nom, description]
    );
    return rows[0];
  }

  async listerCategories() {
    const { rows } = await Database.query('SELECT * FROM categories', []);
    return rows;
  }
}
