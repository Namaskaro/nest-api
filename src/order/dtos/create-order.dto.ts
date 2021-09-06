import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/user/user.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

export class CreateOrderDto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  customer: User;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  taxes: number;

  @ApiProperty()
  @Column()
  total: number;

  @ApiProperty()
  @Column()
  items: OrderItem[];
}

export class CreateOrderOutputDto extends CoreOutput {}
