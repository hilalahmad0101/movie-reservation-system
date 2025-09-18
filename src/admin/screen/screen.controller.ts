import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { Auth } from '../../common/guards/jwt-roles.guard';
import { Role } from '../../common/enums/role.enum';

@Auth(Role.ADMIN)
@Controller('admin/screens')
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @Post()
  create(@Body() createScreenDto: CreateScreenDto) {
    return this.screenService.create(createScreenDto);
  }

  @Get()
  findAll() {
    return this.screenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenDto: UpdateScreenDto) {
    return this.screenService.update(id, updateScreenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenService.remove(id);
  }
}
