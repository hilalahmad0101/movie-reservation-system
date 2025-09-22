import { IsNotEmpty, IsInt, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { ReservationStatus } from '../../../common/enums/reservation-status.enum';
export class CreateReservationDto {
  @IsNotEmpty()
  @IsInt()
  showtimeId: number;

  @IsArray()
  @ArrayNotEmpty()
  seatIds: number[];

  @IsEnum(ReservationStatus)
  status?: ReservationStatus; // default pending
}
