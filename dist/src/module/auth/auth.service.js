"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_payload_interface_1 = require("../../interfaces/jwt-payload.interface");
const login_status_interface_1 = require("../../interfaces/login-status.interface");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../../entities/auth/user.entity");
const result_interface_1 = require("../../interfaces/result.interface");
const user_dto_1 = require("../user/dto/user.dto");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const mail_service_1 = require("../../mail/mail.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, mapper, mailerService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mapper = mapper;
        this.mailerService = mailerService;
    }
    async login(loginUserDto) {
        const user = await this.userService.login(loginUserDto);
        const token = this._createToken(user);
        return Object.assign({ userId: user.id, account: user.account }, token);
    }
    async loginWithCookie(loginUserDto) {
        const user = await this.userService.login(loginUserDto);
        return this.getCookieWithJwtToken(user);
    }
    getCookieWithJwtToken(user) {
        const { expiresIn, accessToken } = this._createToken(user);
        return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
    }
    async getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
    async forgetPassword(forgetPasswordDto) {
        const { account } = forgetPasswordDto;
        const newPassword = await this.userService.forgetPassword(account);
        const user = await this.userService.getByAccount(account);
        const userDto = this.mapper.map(user, user_dto_1.UserDto);
        this.mailerService.sendNotiEmail(userDto, `this is your new password: ${newPassword}`);
        return newPassword;
    }
    async changePassword(changePasswordDto) {
        return await this.userService.changePassword(changePasswordDto);
    }
    async validateUser(payload) {
        const { account } = payload;
        const usersInDb = await this.userService.getByAccount(account);
        if (!usersInDb) {
            throw new common_1.HttpException(`Wrong token!`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.mapper.map(usersInDb, user_dto_1.UserDto);
    }
    _createToken(user) {
        const expiresIn = process.env.EXPIRESIN;
        const account = user.account;
        const role = user.role;
        const payload = { account, role };
        const accessToken = this.jwtService.sign(payload);
        return {
            expiresIn,
            accessToken,
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(2, nestjsx_automapper_1.InjectMapper()),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        nestjsx_automapper_1.AutoMapper,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map