import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { OrderService } from './order.service';
import { OrderItem } from './entities/order-item.entity';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, OrderItem])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
