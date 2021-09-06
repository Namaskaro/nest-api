import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Color])],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorsModule {}
