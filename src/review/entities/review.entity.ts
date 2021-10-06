import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class Review extends CoreEntity {
  @ApiProperty()
  @Column()
  userId: User;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  body: string;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  @CreateDateColumn()
  postedDate: Date;
}
