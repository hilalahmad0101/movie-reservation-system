import { IsNotEmpty, IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreateShowtimeDto {
  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @IsNotEmpty()
  @IsInt()
  screenId: string;

  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @IsNotEmpty()
  @IsDateString()
  end_time: Date;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
