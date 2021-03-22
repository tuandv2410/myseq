import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions ={
  type: 'postgres',
  host: process.env.POSTGRES_SERVER,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsRun: true,
  entities: [
    // 'dist/src/entities/*.entity{.ts,.js}'
    'dist/src/entities/*.entity{.ts,.js}',
    'dist/src/entities/**/*.entity{.ts,.js}',
    'dist/src/entities/**/**/*.entity{.ts,.js}',
  ],
  
  migrations: [
    'dist/src/migrations/*{.ts,.js}',
  ],
  cli: {
    migrationsDir: 'dist/src/migrations',
  },
}