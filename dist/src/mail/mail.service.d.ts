import { Queue } from 'bull';
import { UserDto } from 'src/module/user/dto/user.dto';
export declare class MailService {
    private mailQueue;
    constructor(mailQueue: Queue);
    sendNotiEmail(user: UserDto, noti: string): Promise<boolean>;
}
