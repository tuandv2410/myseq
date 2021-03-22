import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { LoginStatus } from 'src/interfaces/login-status.interface';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.user.dto';
import { UserEntity } from 'src/entities/auth/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { UserDto } from '../user/dto/user.dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { MailService } from 'src/mail/mail.service'
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectMapper()
    private mapper: AutoMapper,
    private readonly mailerService: MailService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.userService.login(loginUserDto);
    
    const token = this._createToken(user);

    return {
      userId: user.id,
      account: user.account,
      ...token,
    };
  }

  async loginWithCookie(loginUserDto: LoginUserDto){
    const user = await this.userService.login(loginUserDto);
    return this.getCookieWithJwtToken(user);
  }

  public getCookieWithJwtToken(user: UserEntity) {
    const { expiresIn, accessToken } = this._createToken(user);
    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }

  async getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const {account} = forgetPasswordDto;
    const newPassword = await this.userService.forgetPassword(account);
    const user: UserEntity = await this.userService.getByAccount(account)
    const userDto = this.mapper.map(user, UserDto);
    this.mailerService.sendNotiEmail(userDto,`this is your new password: ${newPassword}`);
    return newPassword
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<ResultInterface> {
    return await this.userService.changePassword(changePasswordDto);
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const { account } = payload;
    const usersInDb = await this.userService.getByAccount(account);

    if (!usersInDb) {
      throw new HttpException(`Wrong token!`, HttpStatus.BAD_REQUEST);
    }
    
    return this.mapper.map(usersInDb, UserDto);
  }

  private _createToken(user: UserEntity): any {
      
    const expiresIn = process.env.EXPIRESIN;

    const account= user.account;
    const role = user.role;
    const payload: JwtPayload = { account, role };

    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn,
      accessToken,
    };
  }
}
