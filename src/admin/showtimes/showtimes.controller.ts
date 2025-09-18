import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Auth } from '../../common/guards/jwt-roles.guard';
import { Role } from '../../common/enums/role.enum';

@Auth(Role.ADMIN)
@Controller('admin/showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimesService.create(createShowtimeDto);
  }

  @Get()
  findAll() {
    return this.showtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showtimesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
    return this.showtimesService.update(+id, updateShowtimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showtimesService.remove(+id);
  }
}
