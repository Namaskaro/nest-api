import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class UserAccessKeyInput {}

export class UserAccessKeyOutput extends CoreOutput {
  token?: string;
}
