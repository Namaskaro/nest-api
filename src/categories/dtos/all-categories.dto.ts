import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

export class AllCategoriesOutputDto extends CoreOutput {
  categories?: Category[];
}
