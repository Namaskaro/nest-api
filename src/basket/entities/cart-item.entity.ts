import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  descriprion: string;

  @Column()
  price: number;

  @Column()
  coverImg: string;

  @Column()
  subtotal: number;
}
