import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsDateString,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsDateString()
  release_date?: Date;

  @IsOptional()
  @IsString()
  @IsUrl({},{message:'Must be url'})
  poster_url?: string;
}
