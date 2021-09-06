import { ApiProperty } from '@nestjs/swagger';
import { GoogleUser } from 'src/auth/google.user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum } from 'class-validator';

export enum UserType {
  GoogleUser = 'GoogleUser',
  User = 'User',
}

@Entity()
export class Dialog extends CoreEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  author: User;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserType, nullable: true })
  @IsEnum(UserType)
  partner: UserType;
}
