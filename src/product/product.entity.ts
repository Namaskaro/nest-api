import { Color } from '../colors/entities/color.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export enum Sizes {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  descriprion: string;

  @Column()
  price: number;

  @Column()
  coverImg: string;

  @Column('text', { array: true })
  photos: string[];

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Column({ type: 'enum', enum: Sizes, nullable: true })
  @IsEnum(Sizes)
  sizes: Sizes;

  @OneToMany((type) => Color, (color) => color.product, { nullable: true })
  color: Color;
}
