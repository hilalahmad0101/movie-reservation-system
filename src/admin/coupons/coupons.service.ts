import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(@InjectRepository(Coupon) private couponRepository: Repository<Coupon>) {}

  async create(dto: CreateCouponDto) {
    const coupon = this.couponRepository.create(dto);
    return this.couponRepository.save(coupon);
  }

  async findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOne({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.findOne({where: { id }});
    if (!coupon) throw new NotFoundException('Coupon not found');
    Object.assign(coupon, updateCouponDto);
    return this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const coupon = await this.couponRepository.findOne({where: { id }});
    if (!coupon) throw new NotFoundException('Coupon not found');
    await this.couponRepository.remove(coupon);
    return { deleted: true };
  }

  async validateCode(code: string) {
    const coupon = await this.couponRepository.findOne({ where: { code } });
    if (!coupon) throw new NotFoundException('Invalid coupon code');

    if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) {
      throw new BadRequestException('Discount code expired');
    }

    if (coupon.usage_limit && coupon.times_used >= coupon.usage_limit) {
      throw new BadRequestException('Discount code usage limit reached');
    }

    return coupon;
  }

  async markUsed(id: number) {
    const coupon = await this.couponRepository.findOne({where: { id }});
    if (!coupon) throw new NotFoundException('Coupon not found');
    coupon.times_used += 1;
    return this.couponRepository.save(coupon);
  }
}
