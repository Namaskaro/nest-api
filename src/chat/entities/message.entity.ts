import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mesasage extends CoreEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  author: User;

  @ApiProperty()
  @Column()
  partner: User;

  @ApiProperty()
  @Column()
  text: string;
}
