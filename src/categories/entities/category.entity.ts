import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  title: string;

  @Column({ unique: true })
  @IsString()
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
