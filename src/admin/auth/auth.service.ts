import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Role } from '../../common/enums/role.enum';
import { comparePassword } from '../../common/utils/password.util';
import { generateToken } from '../../common/utils/jwt.util';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)

    private readonly userRepository: Repository<User>,
  ) {}


  async login(loginDto:LoginDto){
    try{
      const user=await this.userRepository.findOneByOrFail({email:loginDto.email});
      if (!user || !(await comparePassword(loginDto.password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }

      if(user.role !== Role.ADMIN){
        throw new UnauthorizedException('Only Admin can access');
      }
      const token = await generateToken(user);
      return {
        token,user
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
