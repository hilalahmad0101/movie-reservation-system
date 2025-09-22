import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateReservationDto } from '../home/dto/create-reservation.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth } from '../../common/guards/jwt-roles.guard';
import { UpdateReservationDto } from '../home/dto/update-reservation.dto';
import { Role } from '../../common/enums/role.enum';
import { ReservationService } from './reservation.service';

@Controller('user/reservation')
export class ReservationController {

  constructor(private readonly reservationService: ReservationService) {}

  // User can book
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateReservationDto,@CurrentUser() user:any) {
    return this.reservationService.create(dto,user);
  }

  // Admin view all reservationService
  @Auth(Role.ADMIN)
  @Get()
  async findAll() {
    return this.reservationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, dto);
  }

  // User/Admin can cancel
  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  async cancel(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.cancel(id);
  }

  // Admin delete
  @Auth(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.remove(id);
  }
}
