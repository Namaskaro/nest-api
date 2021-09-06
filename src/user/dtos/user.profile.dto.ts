import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../user.entity';

export class UserProfileInputDto {
  @ApiProperty()
  userId: number;
}

export class UserProfileOutputDto extends CoreOutput {
  @ApiProperty()
  user?: User;
}
