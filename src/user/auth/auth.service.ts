import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../admin/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { comparePassword, hashPassword } from '../../common/utils/password.util';
import { LoginDto } from './dto/login.dto';
import { Role } from '../../common/enums/role.enum';
import { generateToken } from '../../common/utils/jwt.util';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async register(registerDto:RegisterDto){
    const is_user=await this.userRepository.findOne({where:{email:registerDto.email}});
    if(is_user){
      throw new ConflictException('Email already exists');
    }

    const hash_password=await hashPassword(registerDto.password);
    const user=this.userRepository.create({
      name:registerDto.name,
      email:registerDto.email,
      phone:registerDto.phone,
      password:hash_password,
    })
    return await this.userRepository.save(user);
  }

  async login(loginDto:LoginDto){
    try{
      const user=await this.userRepository.findOneByOrFail({email:loginDto.email});
      if (!user || !(await comparePassword(loginDto.password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const token = await generateToken(user);
      return {
        token,
        user
      };
    }catch(error){
      throw new InternalServerErrorException(error.message);
    }
  }


  async getUserById(id: number) {
    try{
      const user = await this.userRepository.findOneByOrFail({ id });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { password, ...result } = user
      return result;
    }catch (error){
      throw new InternalServerErrorException(error.message);
    }
  }
}
