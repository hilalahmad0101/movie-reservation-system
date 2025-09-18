import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from './entities/cinema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CinemaService {

  constructor(
    @InjectRepository(Cinema)
    private readonly  cinemaRepository: Repository<Cinema>,
  ) {
  }
  async create(createCinemaDto: CreateCinemaDto) {
    const cinema=this.cinemaRepository.create(createCinemaDto);
    return await this.cinemaRepository.save(cinema);
  }

  async findAll() {
    return await this.cinemaRepository.find();
  }

  async findOne(id: number) {
    const cinema=await this.cinemaRepository.findOneByOrFail({ id });
    if (!cinema) {
      throw new NotFoundException('Cinema ${id} not found');
    }
    return cinema;
  }

  async update(id: number, updateCinemaDto: UpdateCinemaDto) {
    const cinema = await this.cinemaRepository.findOneByOrFail({ id });
    if (!cinema) {
      throw new NotFoundException(`Cinema ${id} not found`);
    }
    Object.assign(cinema, updateCinemaDto);
    return await this.cinemaRepository.save(cinema);
  }

  async remove(id: number) {
    const cinema = await this.cinemaRepository.findOneByOrFail({ id });
    if (!cinema) {
      throw new NotFoundException(`Cinema ${id} not found`);
    }
   return await this.cinemaRepository.remove(cinema);
  }
}
