import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity } from 'typeorm';

@Entity()
export class Token extends CoreEntity {
  token: string;
}
