import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleUser } from './google.user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, GoogleUser])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
