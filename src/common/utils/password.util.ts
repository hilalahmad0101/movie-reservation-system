import bcrypt from 'bcrypt'
import { hash } from 'node:crypto';

export const comparePassword = (password: string,hash:string):Promise<Boolean> => {
  return  bcrypt.compare(password,hash);
}

export const hashPassword=async (password:string):Promise<string>=>{
  const salt =await bcrypt.genSalt(10);
  return await bcrypt.hash(password,salt)
}
