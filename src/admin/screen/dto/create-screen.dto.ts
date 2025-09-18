import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateScreenDto {
  @IsNotEmpty()
  @IsString()
  nameOrNumber: string;

  @IsNotEmpty()
  @IsInt()
  cinemaId: number;

  @IsNotEmpty()
  @IsInt()
  seatingCapacity: number;

  @IsNotEmpty()
  @IsString()
  type: string;
}
