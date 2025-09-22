import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../home/entities/reservation.entity';
import { ReservationSeat } from '../home/entities/reservation-seat.entity';
import { Seat } from '../../admin/seats/entities/seat.entity';
import { Showtime } from '../../admin/showtimes/entities/showtime.entity';
import { User } from '../../admin/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation,ReservationSeat,Seat,Showtime,User]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
