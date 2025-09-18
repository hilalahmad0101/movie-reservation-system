import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MovieCreatedEvent } from '../../events/movie-created.event';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(dto);
    const newMovie= await this.movieRepository.save(movie);
    this.eventEmitter.emit(
      'movie.created',
      new MovieCreatedEvent(newMovie.id, newMovie.title),
    );
    return newMovie;
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    Object.assign(movie, dto);
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<Movie> {
    const movie = await this.findOne(id);
    if (!movie) throw new NotFoundException('Movie not found');
    await this.movieRepository.remove(movie);
    return movie;
  }
}
