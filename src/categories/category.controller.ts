import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/categories/categories.service';
import {
  CreateCategoryInputDto,
  CreateCategoryOutputDto,
} from './dtos/create-category.dto';

@ApiTags('Category')
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  async createColor(
    @Body() createCategoryDto: CreateCategoryInputDto,
  ): Promise<CreateCategoryOutputDto> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
