import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Verification } from '../verification.entity';

export class VerifyEmailOutputDto extends CoreOutput {}

export class VerifyEmailDto {
  @ApiProperty()
  code: string;
}
