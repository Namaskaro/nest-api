import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserRole } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}

export class CreateAccountOutputDto extends CoreOutput {}
