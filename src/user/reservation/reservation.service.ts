import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../home/entities/reservation.entity';
import { ReservationSeat } from '../home/entities/reservation-seat.entity';
import { User } from '../../admin/user/entities/user.entity';
import { Showtime } from '../../admin/showtimes/entities/showtime.entity';
import { Seat } from '../../admin/seats/entities/seat.entity';
import { In, Repository } from 'typeorm';
import { CreateReservationDto } from '../home/dto/create-reservation.dto';
import { SeatStatus } from '../../common/enums/seat-status.enum';
import { ReservationStatus } from '../../common/enums/reservation-status.enum';
import { UpdateReservationDto } from '../home/dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationSeat) private reservationSeatRepository: Repository<ReservationSeat>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Showtime) private showtimeRepo: Repository<Showtime>,
    @InjectRepository(Seat) private seatRepo: Repository<Seat>,
  ) {}

  async create(createReservationDto: CreateReservationDto,user1:User) {
    try{
      const user = await this.userRepository.findOne({ where: { id: user1.id } });
      if (!user) throw new Error('User not found');

      const showtime = await this.showtimeRepo.findOne({ where: { id: createReservationDto.showtimeId } });
      if (!showtime) throw new NotFoundException('Showtime not found');

      const seats = await this.seatRepo.find({ where: { id: In(createReservationDto.seatIds) } });
      if (seats.length !== createReservationDto.seatIds.length) {
        throw new BadRequestException('One or more seats not found');
      }

      // Check seat availability
      const unavailable = seats.filter((s) => s.status !== SeatStatus.AVAILABLE);
      if (unavailable.length > 0) {
        throw new BadRequestException('Some seats are not available');
      }

      // Mark seats as booked
      for (const seat of seats) {
        seat.status = SeatStatus.BOOKED;
      }
      await this.seatRepo.save(seats);

      // Calculate total amount
      const totalAmount = showtime.price * seats.length;

      const reservation = this.reservationRepository.create({
        user,
        showtime,
        booking_date: new Date(),
        total_amount: totalAmount,
        status: createReservationDto.status || ReservationStatus.PENDING,
      });

      const savedReservation = await this.reservationRepository.save(reservation);

      // Save pivot table entries
      const rsRecords = seats.map((seat) =>
        this.reservationSeatRepository.create({ reservation: savedReservation, seat }),
      );
      await this.reservationSeatRepository.save(rsRecords);

      return this.findOne(savedReservation.id);
    }catch (e) {
      return e.message
    }
  }

  async findAll() {
    return this.reservationRepository.find({
      relations: ['user', 'showtime', 'seats', 'seats.seat'],
    });
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'showtime', 'seats', 'seats.seat'],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async cancel(id: number) {
    const reservation = await this.findOne(id);
    reservation.status = ReservationStatus.CANCELLED;

    // Free up seats
    const seatIds = reservation.seats.map((rs) => rs.seat.id);
    const seats = await this.seatRepo.find({ where: { id: In(seatIds) } });
    for (const seat of seats) {
      seat.status = SeatStatus.AVAILABLE;
    }
    await this.seatRepo.save(seats);

    return this.reservationRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
    return { deleted: true };
  }
}
