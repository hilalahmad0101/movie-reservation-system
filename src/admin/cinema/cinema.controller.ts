import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { Auth } from '../../common/guards/jwt-roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('admin/cinemas')
@Auth(Role.ADMIN)
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Get()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }
}
