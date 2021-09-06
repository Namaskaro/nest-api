import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}
}
