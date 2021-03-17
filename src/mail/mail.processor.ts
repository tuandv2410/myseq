import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { plainToClass } from "class-transformer";
import { LoggerService } from "src/logger/logger.service";
import { UserDto } from "src/module/user/dto/user.dto";

@Processor("mailqueue")
export class MailProcessor {

  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: LoggerService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
  }

  @Process('noti')
  async sendWelcomeEmail(job: Job<{ user: UserDto, noti: string }>): Promise<any> {
    this.logger.log(`Sending noti email to '${job.data.user.account}'`)
    
    try {
      const result = await this.mailerService.sendMail({
        template: 'noti',
        context: {
          ...plainToClass(UserDto, job.data.user),
          noti: job.data.noti,
        },
        subject: `Notification`,
        to: job.data.user.account,
      })
      return result

    } catch (error) {
      this.logger.error(`Failed to send noti email to '${job.data.user.account}'`, error.stack)
      throw error
    }
  }
}