import { BullModuleAsyncOptions } from '@nestjs/bull';
import * as dotenv from 'dotenv';
dotenv.config();

export const bullConfig: BullModuleAsyncOptions ={
  name: process.env.QUEUE_NAME,
  useFactory: () => ({
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    },
  }),
}