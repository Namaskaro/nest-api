import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { Repository } from 'typeorm';
import {
  CreateProductInputDto,
  CreateProductOutputDto,
} from './dtos/create-product.dto';
import { AllProductsOutput } from './dtos/products.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
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

      await this.products.save(newProduct);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create product',
      };
    }
  }

  async getProductsByCategory(category: Category) {
    return await this.products.find({ category });
  }

  async getAllProducts(): Promise<AllProductsOutput> {
    try {
      const products = await this.products.find();
      return {
        ok: true,
        products,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load restaurants',
      };
    }
  }
}
