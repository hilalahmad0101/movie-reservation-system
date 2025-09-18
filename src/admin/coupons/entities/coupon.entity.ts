import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DiscountType } from '../../../common/enums/discount-type.enum';


@Entity('coupons')
export class Coupon {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: DiscountType })
  discount_type: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number; // amount (flat) or percentage

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @Column({ type: 'int', nullable: true })
  usage_limit: number;

  @Column({ type: 'int', default: 0 })
  times_used: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
