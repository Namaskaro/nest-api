import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './product/product.entity';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { JwtModule } from './jwt/jwt.module';
import { CommonModule } from './common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mail/mail.module';
import * as Joi from 'joi';
import { User } from './user/user.entity';
import { Verification } from './user/verification.entity';
import { UserController } from './user/controllers/user.controller';
import { Category } from './product/category.entity';

import { BasketModule } from './basket/basket.module';
import { OrderController } from './order/order.controller';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/order-item.entity';
import { UnauthorizedUser } from './user/unauthorized-user.entity';
import { ReviewModule } from './review/review.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'meat',
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        Product,
        User,
        UnauthorizedUser,
        Verification,
        Category,
        Order,
        OrderItem,
      ],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
      userAccessKey: process.env.USER_ACCESS_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    ProductModule,
    UserModule,
    OrderModule,
    JwtModule,
    CommonModule,
    MailModule,
    BasketModule,
    OrderModule,
    ReviewModule,
    BlogModule,
  ],
  controllers: [UserController, OrderController],
})
export class AppModule {}
