import { MailerService } from "@nestjs-modules/mailer";
import { Job } from "bull";
import { LoggerService } from "src/logger/logger.service";
import { UserDto } from "src/module/user/dto/user.dto";
export declare class MailProcessor {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService, logger: LoggerService);
    onActive(job: Job): void;
    onComplete(job: Job, result: any): void;
    onError(job: Job<any>, error: any): void;
    sendWelcomeEmail(job: Job<{
        user: UserDto;
        noti: string;
    }>): Promise<any>;
}
