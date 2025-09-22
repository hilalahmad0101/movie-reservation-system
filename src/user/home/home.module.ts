import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../admin/movie/entities/movie.entity';
import { Showtime } from '../../admin/showtimes/entities/showtime.entity';
import { Cinema } from '../../admin/cinema/entities/cinema.entity';
import { Seat } from '../../admin/seats/entities/seat.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Movie,Showtime,Cinema,Seat])
  ],
  providers: [HomeService],
  controllers: [HomeController]
})
export class HomeModule {}
