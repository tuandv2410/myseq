import { Response } from 'express';
import { LoginStatus } from 'src/interfaces/login-status.interface';
import { ResultInterface } from 'src/interfaces/result.interface';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginUserDto } from './dto/login.user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<LoginStatus>;
    loginWithCookie(loginUserDto: LoginUserDto, response: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<ResultInterface>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<string>;
    logout(): Promise<LoginStatus>;
}
