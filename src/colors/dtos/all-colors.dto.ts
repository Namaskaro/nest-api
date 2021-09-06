import { CoreOutput } from 'src/common/dtos/output.dto';
import { Color } from '../entities/color.entity';

export class AllColorsOutputDto extends CoreOutput {
  colors?: Color[];
}
