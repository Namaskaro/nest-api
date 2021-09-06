import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateColorInputDto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  code: string;
}

export class CreateColorOutputDto extends CoreOutput {}
