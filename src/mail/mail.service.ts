import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UserDto } from 'src/module/user/dto/user.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue("mailqueue")
    private mailQueue: Queue,
  ) {}

  async sendNotiEmail(user: UserDto, noti: string): Promise<boolean> {
    try {
      await this.mailQueue.add('noti', {
        user,
        noti,
      })
      return true
    } catch (error) {
      return false
    }
  }
}
