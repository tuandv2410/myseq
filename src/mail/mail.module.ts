import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { mailConfig } from 'src/config/mail.config';
import { bullConfig } from 'src/config/bull.config';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => (mailConfig),
    }),
    BullModule.registerQueueAsync(bullConfig),
    LoggerModule,
  ],
  controllers: [],
  providers: [
    MailService,
    MailProcessor,
  ],
  exports: [
    MailService,
  ],
})
export class MailModule {}
