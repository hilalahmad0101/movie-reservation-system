import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cinema } from '../../cinema/entities/cinema.entity';

@Entity('screens')
export class Screen {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name_or_number' })
  @Column()
  nameOrNumber: string;

  @ManyToOne(() => Cinema, (cinema:Cinema) => cinema.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;

  @Column({ name: 'seating_capacity', type: 'int' })
  @Column()
  seatingCapacity:number;

  @Column()
  type: string;
}
