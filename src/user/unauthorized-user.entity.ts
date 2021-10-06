import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UnauthorizedUser extends CoreEntity {
  @ApiProperty()
  @Column()
  userAccessKey: string;
}
