import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Screen } from '../screen/entities/screen.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat,Screen])
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
