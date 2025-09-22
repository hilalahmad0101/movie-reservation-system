import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../admin/movie/entities/movie.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Showtime } from '../../admin/showtimes/entities/showtime.entity';
import { Cinema } from '../../admin/cinema/entities/cinema.entity';
import { Seat } from '../../admin/seats/entities/seat.entity';

@Injectable()
export class HomeService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Showtime)
    private readonly showtimeRepository:Repository<Showtime>,
    @InjectRepository(Cinema)
    private readonly cinemaRepository:Repository<Cinema>,
    @InjectRepository(Seat)
    private readonly seatRepository:Repository<Seat>
  ) {}

  async getMovies() {
    const [movies,total]= await this.movieRepository.findAndCount();
    return {
      movies,
      total: total,
    };
  }

  async getMovieDetails(id:number) {
    const movie= await this.movieRepository.findOne({
      where:{
        id,
      }
    });
    return {
      movie
    };
  }

  async getShowTimes() {
    const [showtimes,total]= await this.showtimeRepository.findAndCount();
    return {
      showtimes,
      total: total,
    };
  }

  async getCinema() {
    const [cinemas,total]= await this.cinemaRepository.findAndCount();
    return {
      cinemas,
      total: total,
    };
  }

  async getSeats() {
    const [seats,total]= await this.seatRepository.findAndCount();
    return {
      seats,
      total: total,
    };
  }

}
