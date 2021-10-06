import { Entity, Column } from 'typeorm';
import { Item } from './cart-item.entity';

@Entity()
export class Basket {
  @Column()
  userId: string;

  @Column()
  items: Item[];

  @Column()
  total: string;
}
