import { IsEnum, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { SeatType } from '../../../common/enums/seat-type.enum';
import { SeatStatus } from '../../../common/enums/seat-status.enum';

export class CreateSeatDto {
  @IsNotEmpty()
  @IsInt()
  screenId: string;

  @IsNotEmpty()
  @IsString()
  seat_number: string;

  @IsEnum(SeatType)
  seat_type: SeatType;

  @IsEnum(SeatStatus)
  status: SeatStatus;
}
