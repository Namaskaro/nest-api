import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from 'src/product/product.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateCategoryInputDto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  products?: Product[];
}

export class CreateCategoryOutputDto extends CoreOutput {}
