import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class EditColoreOutputDto extends CoreOutput {}

export class EditColorInputDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  code: string;
}
