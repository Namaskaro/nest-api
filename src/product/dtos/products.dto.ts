import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../product.entity';

export class AllProductsOutput extends CoreOutput {
  products?: Product[];
}
