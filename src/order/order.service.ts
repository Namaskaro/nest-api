import { CreateAccountOutputDto } from './../user/dtos/create.account.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, CreateOrderOutputDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderOutputDto> {
    try {
      return;
    } catch (error) {}
  }
}
