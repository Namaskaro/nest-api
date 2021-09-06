import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import {
  CreateCategoryInputDto,
  CreateCategoryOutputDto,
} from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async createCategory({
    title,
    slug,
    products,
  }: CreateCategoryInputDto): Promise<CreateCategoryOutputDto> {
    try {
      const exists = await this.categories.findOne({ title });
      if (exists) {
        return {
          ok: false,
          error: 'Category already exists',
        };
      }
      const category = await this.categories.create({ title, slug, products });
      this.categories.save(category);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: 'Could not create category' };
    }
  }
}
