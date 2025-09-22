import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../home/entities/reservation.entity';
import { CouponsService } from '../../admin/coupons/coupons.service';
import { PaymentStatus } from '../../common/enums/payment-status.enum';
import { ReservationStatus } from '../../common/enums/reservation-status.enum';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    private couponService: CouponsService,
  ) {
    this.stripe = new Stripe('asdfasdas');
  }

  async create(dto: CreatePaymentDto) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: dto.reservationId },
      relations: ['user'],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (reservation.status !== ReservationStatus.PENDING) {
      throw new BadRequestException('Reservation is not pending');
    }

    let amount = Number(reservation.total_amount);

    // ✅ Apply coupon if provided
    if (dto.couponCode) {
      const discount = await this.couponService.validateCode(dto.couponCode);

      if (discount.discount_type === 'flat') {
        amount = Math.max(0, amount - Number(discount.value));
      } else if (discount.discount_type === 'percentage') {
        amount = amount - (amount * Number(discount.value)) / 100;
      }

      await this.couponService.markUsed(discount.id);
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    // ✅ Create Stripe PaymentIntent
    const intent = await this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        reservationId: reservation.id.toString(),
        userId: reservation.user.id.toString(),
      },
    });

    // Save payment record
    const payment = this.paymentRepository.create({
      reservation,
      payment_method: dto.payment_method,
      transaction_id: intent.id,
      amount,
      status: PaymentStatus.PENDING,
    });
    await this.paymentRepository.save(payment);

    return {
      clientSecret: intent.client_secret,
      amount,
      reservationId: reservation.id,
    };
  }

  async confirmPayment(paymentIntentId: string) {
    const intent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

    const payment = await this.paymentRepository.findOne({
      where: { transaction_id: paymentIntentId },
      relations: ['reservation'],
    });
    if (!payment) throw new NotFoundException('Payment not found');

    if (intent.status === 'succeeded') {
      payment.status = PaymentStatus.SUCCESS;
      payment.payment_date = new Date();
      payment.reservation.status = ReservationStatus.CONFIRMED;
      await this.reservationRepository.save(payment.reservation);
    } else if (intent.status === 'requires_payment_method') {
      payment.status = PaymentStatus.FAILED;
    }

    return this.paymentRepository.save(payment);
  }
}
