import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoogleUser {
  @PrimaryGeneratedColumn()
  googleId: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;
}
