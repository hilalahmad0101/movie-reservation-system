import { Module, NotFoundException } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Screen } from './entities/screen.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Screen,Cinema])
  ],
  controllers: [ScreenController],
  providers: [ScreenService],
})
export class ScreenModule {}
