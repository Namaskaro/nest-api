import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Pending = 'Pending',
  AwaitPayment = 'AwaitingPayment',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

@Entity()
export class Order extends CoreEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @RelationId((order: Order) => order.customer)
  customerId: number;

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
  status: string;

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
  @ManyToMany((type) => OrderItem)
  @JoinTable()
  items: OrderItem[];

  @ApiProperty()
  @Column()
  date: Date;
}
