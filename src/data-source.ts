import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './admin/user/entities/user.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'hilalahmad',
  database: 'mrs',
  entities: [User],
  synchronize: true,
  logging: false,
});
