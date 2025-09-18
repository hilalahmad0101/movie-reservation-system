import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from './entities/showtime.entity';
import { Movie } from '../movie/entities/movie.entity';
import { Screen } from '../screen/entities/screen.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime) private showtimeRepository: Repository<Showtime>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(Screen) private screenRepository: Repository<Screen>,
  ) {}

  async create(createShowtimeDto: CreateShowtimeDto) {
    const movie = await this.movieRepository.findOne({ where: { id: createShowtimeDto.movieId } });
    if (!movie) throw new NotFoundException('Movie not found');

    const screen = await this.screenRepository.findOne({ where: { id: createShowtimeDto.screenId  } });
    if (!screen) throw new NotFoundException('Screen not found');

    const showtime = this.showtimeRepository.create({
      movie,
      screen,
      start_time: createShowtimeDto.start_time,
      end_time: createShowtimeDto.end_time,
      price: createShowtimeDto.price,
    });

    return this.showtimeRepository.save(showtime);
  }

  async findAll() {
    return this.showtimeRepository.find({ relations: ['movie', 'screen'] });
  }

  async findOne(id: number) {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: ['movie', 'screen'],
    });
    if (!showtime) throw new NotFoundException('Showtime not found');
    return showtime;
  }

  async update(id: number, dto: UpdateShowtimeDto) {
    const showtime = await this.showtimeRepository.findOne({where:{id} });
    if(!showtime){
      throw new NotFoundException('Showtime not found')
    }

    if (dto.movieId) {
      const movie = await this.movieRepository.findOne({ where: { id: dto.movieId } });
      if (!movie) throw new NotFoundException('Movie not found');
      showtime.movie = movie;
    }

    if (dto.screenId) {
      const screen = await this.screenRepository.findOne({ where: { id: dto.screenId } });
      if (!screen) throw new NotFoundException('Screen not found');
      showtime.screen = screen;
    }

    Object.assign(showtime, dto);
    return this.showtimeRepository.save(showtime);
  }

  async remove(id: number) {
    const showtime = await this.showtimeRepository.findOne({where:{id} });
    if(!showtime){
      throw new NotFoundException('Showtime not found')
    }
    await this.showtimeRepository.remove(showtime);
    return { deleted: true };
  }
}
