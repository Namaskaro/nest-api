import { CoreEntity } from 'src/common/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';

export enum UserRole {
  Client = 'Client',
  Manager = 'Manager',
  Owner = 'Owner',
}

@Entity()
export class User extends CoreEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  avatar?: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserRole, nullable: true })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @Column({ nullable: true })
  last_seen: Date;

  @ApiProperty()
  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @ApiProperty()
  @Column({ default: false })
  @IsBoolean()
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
