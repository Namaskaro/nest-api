import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  //   providers: [UserService],
  //   controllers: [UserController],
  //   exports: [UserService],
})
export class ReviewModule {}
