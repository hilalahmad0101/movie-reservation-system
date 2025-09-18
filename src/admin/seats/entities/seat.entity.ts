import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeatType } from '../../../common/enums/seat-type.enum';
import { SeatStatus } from '../../../common/enums/seat-status.enum';
import { Screen } from '../../screen/entities/screen.entity';


@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Screen, (screen) => screen.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'screen_id' })
  screen: Screen;

  @Column({ name: 'seat_number', length: 20 })
  seat_number: string; // e.g. A1, A2

  @Column({
    type: 'enum',
    enum: SeatType,
    default: SeatType.REGULAR,
  })
  seat_type: SeatType;

  @Column({
    type: 'enum',
    enum: SeatStatus,
    default: SeatStatus.AVAILABLE,
  })
  status: SeatStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
