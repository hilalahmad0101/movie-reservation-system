import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from '../screen/entities/screen.entity';
import { Movie } from '../movie/entities/movie.entity';
import { Showtime } from './entities/showtime.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Screen,Movie,Showtime])
  ],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
})
export class ShowtimesModule {}
