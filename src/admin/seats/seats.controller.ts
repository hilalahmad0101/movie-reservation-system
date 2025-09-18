import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatStatus } from '../../common/enums/seat-status.enum';
import { Auth } from '../../common/guards/jwt-roles.guard';
import { Role } from '../../common/enums/role.enum';

@Auth(Role.ADMIN)
@Controller('admin/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }

  @Get()
  findAll() {
    return this.seatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatsService.update(+id, updateSeatDto);
  }

  @Patch(':id/status/:status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') status: SeatStatus,
  ) {
    return this.seatsService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id);
  }
}
