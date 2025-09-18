import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth } from '../../common/guards/jwt-roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('admin/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @Auth(Role.ADMIN)
  @Get('me')
  async currentAdminInfo(@CurrentUser() user) {
    const admin = await this.authService.getUserById(user.id);
    return admin;
  }
}
