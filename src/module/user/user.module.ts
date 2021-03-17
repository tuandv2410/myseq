import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/auth/user.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {

}
