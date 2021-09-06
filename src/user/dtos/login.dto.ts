import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class LoginOutputDto extends CoreOutput {
  @IsString()
  token?: string;
}
