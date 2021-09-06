import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AllColorsOutputDto } from './dtos/all-colors.dto';
import {
  CreateColorInputDto,
  CreateColorOutputDto,
} from './dtos/create-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Color) private readonly colors: Repository<Color>,
  ) {}

  //Craete color
  async createColor({ title, code }: CreateColorInputDto) {
    try {
      const exists = await this.colors.findOne({ title });
      if (exists) {
        return {
          ok: false,
          error: 'User with this email already exists',
        };
      }

      const color = await this.colors.create({ title, code });
      this.colors.save(color);

      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't create color" };
    }
  }
  //Delete color
  async deleteColor(title: string): Promise<DeleteResult> {
    return await this.colors.delete({ title: title });
  }

  //Find by title
  async findColorByTitle(title: string) {
    try {
      const color = await this.colors.findOneOrFail({ title });
      return {
        ok: true,
        color,
      };
    } catch (error) {
      return { ok: false, error: 'Could not find color' };
    }
  }
  //Get all colors

  async allColors(): Promise<AllColorsOutputDto> {
    try {
      const colors = await this.colors.find();
      return {
        ok: true,
        colors,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load colors',
      };
    }
  }
}
