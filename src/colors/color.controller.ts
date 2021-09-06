import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';
import { ColorService } from './color.service';
import {
  CreateColorInputDto,
  CreateColorOutputDto,
} from './dtos/create-color.dto';

@ApiTags('Color')
@Controller()
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post('color')
  async createColor(@Body() createColortDto: CreateColorInputDto) {
    return this.colorService.createColor(createColortDto);
  }
}
