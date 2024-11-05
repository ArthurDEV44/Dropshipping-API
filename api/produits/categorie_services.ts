import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class CategorieService {
  async creerCategorie(nom: string, description: string) {
    try {
      const categorie = await prisma.categorie.create({
        data: { nom, description },
      });
      return categorie;
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
      throw new Error('Erreur lors de la création de la catégorie');
    }
  }

  async listerCategories() {
    try {
      const categories = await prisma.categorie.findMany();
      return categories;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      throw new Error('Erreur lors de la récupération des catégories');
    }
  }
}
