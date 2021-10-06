import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryRepository, Category])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
