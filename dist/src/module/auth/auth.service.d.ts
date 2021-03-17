import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { LoginStatus } from 'src/interfaces/login-status.interface';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.user.dto';
import { UserEntity } from 'src/entities/auth/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { UserDto } from '../user/dto/user.dto';
import { AutoMapper } from 'nestjsx-automapper';
import { MailService } from 'src/mail/mail.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private mapper;
    private readonly mailerService;
    constructor(userService: UserService, jwtService: JwtService, mapper: AutoMapper, mailerService: MailService);
    login(loginUserDto: LoginUserDto): Promise<LoginStatus>;
    loginWithCookie(loginUserDto: LoginUserDto): Promise<string>;
    getCookieWithJwtToken(user: UserEntity): string;
    getCookieForLogOut(): Promise<string>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<string>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<ResultInterface>;
    validateUser(payload: JwtPayload): Promise<UserDto>;
    private _createToken;
}
