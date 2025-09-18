import { IsNotEmpty, IsOptional, IsEnum, IsDateString, IsInt, IsString, IsNumber } from 'class-validator';
import { DiscountType } from '../../../common/enums/discount-type.enum';


export class CreateCouponDto {

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(DiscountType)
  discount_type: DiscountType;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsDateString()
  expiry_date?: Date;

  @IsOptional()
  @IsInt()
  usage_limit?: number;
}
