import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import { Color } from 'src/colors/entities/color.entity';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Color, CategoryRepository, Category]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
