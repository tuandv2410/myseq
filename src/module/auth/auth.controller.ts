import { Body, Controller, Get, HttpCode, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginStatus } from 'src/interfaces/login-status.interface';
import { ResultInterface } from 'src/interfaces/result.interface';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(200)
    @Post('login')
    public async login(
        @Body() loginUserDto: LoginUserDto,
    ): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

    @HttpCode(200)
    @Post('loginCookie')
    public async loginWithCookie(
        @Body() loginUserDto: LoginUserDto,
        @Res() response: Response,
    ) {
        const cookie = await this.authService.loginWithCookie(loginUserDto);
        response.setHeader('Access-Control-Expose-Headers','Set-Cookie')
        response.setHeader('Set-Cookie', cookie);
        return response.send(cookie)
    }

    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({type:UserDto})
    @Roles('user','expert','admin')
    @Put('changePassword')
    public async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<ResultInterface> {
        return await this.authService.changePassword(changePasswordDto);
    }

    @Get('forgetPassword')
    public async forgetPassword(
        @Body() forgetPasswordDto: ForgetPasswordDto,
    ) {
        return await this.authService.forgetPassword(forgetPasswordDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    public async logout(
    ): Promise<LoginStatus> {
        return {
            userId: "",
            username: "",
            accessToken: "",
            expiresIn: ""
        }
        // response.setHeader('Set-Cookie', await this.authService.getCookieForLogOut());
        // return response.sendStatus(200);
    }
}
