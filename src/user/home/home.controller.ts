import { Controller, Get, Param } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('user')
export class HomeController {

  constructor(private readonly homeService: HomeService) { }

  @Get('get/movies')
  async getMovies() {
    return this.homeService.getMovies();
  }

  @Get('get/movie/:id')
  async getMovieDetails(@Param('id') id: number) {
    return this.homeService.getMovieDetails(id);
  }

  @Get('get/showtimes')
  async getShowTime() {
    return this.homeService.getShowTimes();
  }

  @Get('get/cinemas')
  async getCinema() {
    return this.homeService.getCinema();
  }

  @Get('get/seats')
  async getSeats() {
    return this.homeService.getSeats();
  }
}
