import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsString()
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
