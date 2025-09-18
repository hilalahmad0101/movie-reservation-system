import { User } from '../../admin/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

const jwtService=new JwtService({});

export const generateToken=async(user:User)=>{
  const payload={
    name:user.name,
    email:user.email,
    role:user.role,
    sub:user.id
  }
  return jwtService.sign(payload,{
    expiresIn: '1d',
    secret:'Hilalahmadafullstackdeveloper'
  });
}
