import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateProductInputDto,
  CreateProductOutputDto,
} from './dtos/create-product.dto';
import { AllProductsOutput } from './dtos/products.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  async createProduct(
    @Body() createProductInput: CreateProductInputDto,
  ): Promise<CreateProductOutputDto> {
    return this.productService.createProduct(createProductInput);
  }

  @Get('products')
  async getProducts(): Promise<AllProductsOutput> {
    return this.productService.getAllProducts();
  }
}
