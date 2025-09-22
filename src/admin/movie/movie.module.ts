import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { AuthModule } from '../auth/auth.module';
import { MoviesListener } from './movies.listener';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie,User]),
    AuthModule
  ],
  controllers: [MovieController],
  providers: [MovieService,MoviesListener],
})
export class MovieModule {}
