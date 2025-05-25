import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvalidTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  amount: string;

  @Column()
  reason: string;

  @Column()
  fileName: string;
}
