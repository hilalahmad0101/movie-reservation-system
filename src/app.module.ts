import { Module } from '@nestjs/common';
import { AuthModule } from './admin/auth/auth.module';
import { UserModule } from './admin/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './admin/user/entities/user.entity';
import { MovieModule } from './admin/movie/movie.module';
import { Movie } from './admin/movie/entities/movie.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CinemaModule } from './admin/cinema/cinema.module';
import { Cinema } from './admin/cinema/entities/cinema.entity';
import { ScreenModule } from './admin/screen/screen.module';
import { Screen } from './admin/screen/entities/screen.entity';
import { ShowtimesModule } from './admin/showtimes/showtimes.module';
import { Showtime } from './admin/showtimes/entities/showtime.entity';
import { SeatsModule } from './admin/seats/seats.module';
import { Seat } from './admin/seats/entities/seat.entity';
import { CouponsModule } from './admin/coupons/coupons.module';
import { Coupon } from './admin/coupons/entities/coupon.entity';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hilalahmad',
      database: 'mrs',
      entities: [User,Movie,Cinema,Screen,Showtime,Seat,Coupon],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MovieModule,
    CinemaModule,
    ScreenModule,
    ShowtimesModule,
    SeatsModule,
    CouponsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
