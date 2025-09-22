import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Reservation } from '../home/entities/reservation.entity';
import { CouponsService } from '../../admin/coupons/coupons.service';
import { Coupon } from '../../admin/coupons/entities/coupon.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Payment,Reservation,Coupon]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService,CouponsService],
})
export class PaymentModule {}
