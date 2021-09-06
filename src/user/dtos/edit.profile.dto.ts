import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class EditProfileOutputDto extends CoreOutput {}

export class EditProfileDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  avatar: string;
}
