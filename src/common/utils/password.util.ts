import bcrypt from 'bcrypt'

export const comparePassword = (password: string,hash:string):Promise<Boolean> => {
  return  bcrypt.compare(password,hash);
}
