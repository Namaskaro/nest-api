import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateAccountOutputDto extends CoreOutput {
  user?: User;
}
