import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  composition: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  coverImg: string;

  @Column('text', { array: true, nullable: true })
  photos: string[];

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;
}
