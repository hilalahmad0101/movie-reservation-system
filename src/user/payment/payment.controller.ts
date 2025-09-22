import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('user/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Post('confirm/:paymentIntentId')
  async confirm(@Param('paymentIntentId') paymentIntentId: string) {
    return this.paymentService.confirmPayment(paymentIntentId);
  }
}
