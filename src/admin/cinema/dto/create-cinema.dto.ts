import { IsNotEmpty } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  totalScreens: number;

  @IsNotEmpty()
  contactInfo: string;
}
