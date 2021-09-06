import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/product/product.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne((type) => Product, { nullable: true, onDelete: 'CASCADE' })
  product: Product;
}
