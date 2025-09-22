import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsInt()
  reservationId: number;

  @IsNotEmpty()
  @IsString()
  payment_method: string; // e.g. 'card'

  @IsOptional()
  @IsString()
  couponCode?: string; // optional
}
