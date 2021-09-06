import { Product } from 'src/product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  code: string;

  @ManyToOne((type) => Product, (product) => product.color, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  product: Product;
}
