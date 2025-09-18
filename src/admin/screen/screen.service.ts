import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Screen } from './entities/screen.entity';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen) private screenRepository: Repository<Screen>,
    @InjectRepository(Cinema) private cinemaRepository: Repository<Cinema>,
  ) {}

  async create(createScreenDto: CreateScreenDto) {
    const cinema = await this.cinemaRepository.findOne({
      where: { id: createScreenDto.cinemaId },
    });
    if (!cinema) throw new NotFoundException('Cinema not found');

    const screen = this.screenRepository.create({
      nameOrNumber: createScreenDto.nameOrNumber,
      seatingCapacity: createScreenDto.seatingCapacity,
      type: createScreenDto.type,
      cinema,
    });
    return this.screenRepository.save(screen);
  }

  async findAll() {
    return this.screenRepository.find({ relations: ['cinema'] });
  }

  async findOne(id: string) {
    console.log(id)
    const screen = await this.screenRepository.findOne({
      where: { id },
      relations: ['cinema'],
    });
    if (!screen) throw new NotFoundException('Screen not found');
    return screen;
  }

  async update(id: string, updateScreenDto: UpdateScreenDto) {
    const screen = await this.screenRepository.findOne({where:{id}});
    if(!screen){
      throw new NotFoundException('Screen not found');
    }

    if (updateScreenDto.cinemaId) {
      const cinema = await this.cinemaRepository.findOne({
        where: { id: updateScreenDto.cinemaId },
      });
      if (!cinema) throw new NotFoundException('Cinema not found');
      screen.cinema = cinema;
    }

    Object.assign(screen, updateScreenDto);
    return this.screenRepository.save(screen);
  }

  async remove(id: string) {
    const screen = await this.screenRepository.findOne({where:{id}});
    if (!screen) throw new NotFoundException('Screen not found');
    await this.screenRepository.remove(screen);
    return { deleted: true };
  }
}
