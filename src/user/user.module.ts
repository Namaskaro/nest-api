import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Verification } from './verification.entity';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { Order } from 'src/order/entities/order.entity';
import { UnauthorizedUser } from './unauthorized-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Verification, Order, UnauthorizedUser]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
