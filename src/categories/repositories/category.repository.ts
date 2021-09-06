import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getOrCreate(title: string): Promise<Category> {
    const categoryTitle = title.trim().toLowerCase();
    const categorySlug = categoryTitle.replace(/ /g, '-');
    let category = await this.findOne({ slug: categorySlug });
    if (!category) {
      category = await this.save(
        this.create({ slug: categorySlug, title: categoryTitle }),
      );
    }
    return category;
  }
}
