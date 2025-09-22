import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../admin/user/entities/user.entity';
import { Showtime } from '../../../admin/showtimes/entities/showtime.entity';
import { ReservationSeat } from './reservation-seat.entity';
import { ReservationStatus } from '../../../common/enums/reservation-status.enum';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Showtime, (showtime) => showtime.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'showtime_id' })
  showtime: Showtime;

  @OneToMany(() => ReservationSeat, (rs) => rs.reservation, { cascade: true })
  seats: ReservationSeat[];

  @Column({ type: 'timestamp' })
  booking_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
