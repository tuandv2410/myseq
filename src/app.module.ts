import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from 'nestjsx-automapper';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './module/auth/auth.module';
import { DiseaseModule } from './module/disease/disease.module';
import { DrugModule } from './module/drug/drug.module';
import { NutritionModule } from './module/nutrition/nutrition.module';
import { UserModule } from './module/user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AutomapperModule.withMapper(),
    TypeOrmModule.forRoot(typeOrmConfig),
    LoggerModule,
    AuthModule,
    UserModule,
    DiseaseModule,
    DrugModule,
    NutritionModule,
    MailModule,
  ],
})
export class AppModule {}
