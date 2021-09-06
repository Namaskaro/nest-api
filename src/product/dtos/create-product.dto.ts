import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProductInputDto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsString()
  coverImg: string;

  @ApiProperty()
  @IsString()
  images: string[];

  @ApiProperty()
  @IsString()
  categoryName: string;
}

export class CreateProductOutputDto extends CoreOutput {}
