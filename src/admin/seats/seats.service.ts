import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Screen } from '../screen/entities/screen.entity';
import { Repository } from 'typeorm';
import { SeatStatus } from '../../common/enums/seat-status.enum';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
    @InjectRepository(Screen) private screenRepository: Repository<Screen>,
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const screen = await this.screenRepository.findOne({ where: { id: createSeatDto.screenId } });
    if (!screen) throw new NotFoundException('Screen not found');

    const seat = this.seatRepository.create({
      seat_number: createSeatDto.seat_number,
      seat_type: createSeatDto.seat_type,
      status: createSeatDto.status,
      screen,
    });

    return this.seatRepository.save(seat);
  }

  async findAll() {
    return this.seatRepository.find({ relations: ['screen'] });
  }

  async findOne(id: number) {
    const seat = await this.seatRepository.findOne({ where: { id }, relations: ['screen'] });
    if (!seat) throw new NotFoundException('Seat not found');
    return seat;
  }

  async update(id: number, dto: UpdateSeatDto) {
    const seat = await this.seatRepository.findOne({where:{id}});
    if(!seat){
      throw new NotFoundException('Seat not found');
    }
    if (dto.screenId) {
      const screen = await this.screenRepository.findOne({ where: { id: dto.screenId } });
      if (!screen) throw new NotFoundException('Screen not found');
      seat.screen = screen;
    }

    Object.assign(seat, dto);
    return this.seatRepository.save(seat);
  }

  async updateStatus(id: number, status: SeatStatus) {
    const seat = await this.seatRepository.findOne({where:{id}});
    if(!seat){
      throw new NotFoundException('Seat not found');
    }
    seat.status = status;
    return this.seatRepository.save(seat);
  }

  async remove(id: number) {
    const seat = await this.seatRepository.findOne({where:{id}});
    if(!seat){
      throw new NotFoundException('Seat not found');
    }
    await this.seatRepository.remove(seat);
    return { deleted: true };
  }
}
