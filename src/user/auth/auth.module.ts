import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../admin/user/entities/user.entity';
import {AuthModule as AdminAuthModule} from '../../admin/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    AdminAuthModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
