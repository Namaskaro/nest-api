import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import { Color } from 'src/colors/entities/color.entity';
import { Repository } from 'typeorm';
import {
  CreateProductInputDto,
  CreateProductOutputDto,
} from './dtos/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Color) private readonly color: Repository<Color>,
    @InjectRepository(Category) private readonly categories: CategoryRepository,
  ) {}

  async createProduct(
    createProductInputDto: CreateProductInputDto,
  ): Promise<CreateProductOutputDto> {
    try {
      const newProduct = this.products.create(createProductInputDto);

      const category = await this.categories.getOrCreate(
        createProductInputDto.categoryName,
      );

      newProduct.category = category;

      this.products.save(newProduct);

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create product',
      };
    }
  }

 async getProductsByCategory(category: Category) {
   return await this.products.find({category})
 }
}
