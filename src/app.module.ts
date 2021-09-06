import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './product/product.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { JwtModule } from './jwt/jwt.module';
import { CommonModule } from './common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { FacebookStrategy } from './auth/strategies/facebook.strategy';
import { MailModule } from './mail/mail.module';
import * as Joi from 'joi';
import { User } from './user/user.entity';
import { Verification } from './user/verification.entity';
import { UserController } from './user/controllers/user.controller';
import { CategoriesModule } from './categories/categories.module';
import { AuthController } from './auth/auth.controller';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { ColorsModule } from './colors/colors.module';
import { Category } from './categories/entities/category.entity';
import { Color } from './colors/entities/color.entity';
import { FileModule } from './file/file.module';
import { ColorController } from './colors/color.controller';
import { CategoryController } from './categories/category.controller';
import { BasketModule } from './basket/basket.module';
import { GoogleUser } from './auth/google.user.entity';
import { ChatModule } from './chat/chat.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderController } from './order/order.controller';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/order-item.entity';

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
      database: 'shop',
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        Product,
        User,
        Verification,
        Color,
        Category,
        GoogleUser,
        Order,
        OrderItem,
      ],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    ProductModule,
    AuthModule,
    UserModule,
    OrderModule,
    JwtModule,
    CommonModule,
    MailModule,
    CategoriesModule,
    ColorsModule,
    FileModule,
    BasketModule,
    ChatModule,
    FavoriteModule,
    ReviewsModule,
    OrderModule,
  ],
  controllers: [
    UserController,
    AuthController,
    ColorController,
    CategoryController,
    AuthController,
    OrderController,
  ],
  providers: [FacebookStrategy, GoogleStrategy],
})
export class AppModule {}
