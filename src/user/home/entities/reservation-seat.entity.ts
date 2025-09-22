import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Seat } from '../../../admin/seats/entities/seat.entity';

@Entity('reservation_seats')
export class ReservationSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.seats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @ManyToOne(() => Seat, (seat) => seat.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;
}
