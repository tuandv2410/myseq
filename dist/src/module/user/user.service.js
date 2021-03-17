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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/auth/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const result_interface_1 = require("../../interfaces/result.interface");
const logger_service_1 = require("../../logger/logger.service");
const user_dto_1 = require("./dto/user.dto");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const class_transformer_1 = require("class-transformer");
const gender_enum_1 = require("../../enum/gender.enum");
const role_enum_1 = require("../../enum/role.enum");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(userRepo, logger, mapper) {
        this.userRepo = userRepo;
        this.logger = logger;
        this.mapper = mapper;
        this.mapper.createMap(user_entity_1.UserEntity, user_dto_1.UserDto);
    }
    async getAll(filterDto, user) {
        try {
            const result = await this.userRepo.find({ where: filterDto });
            this.logger.log(`User ${user.id} get users by filter: ${filterDto}`);
            return this.mapper.mapArray(result, user_dto_1.UserDto);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException("get Users fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getByAccount(account) {
        try {
            const found = await this.userRepo.findOne({ where: { account: account } });
            if (!found) {
                throw new common_1.HttpException(`User with account ${account} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return found;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException("get User fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id, user) {
        try {
            const found = await this.userRepo.findOne(id);
            if (!found) {
                throw new common_1.HttpException(`User with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            this.logger.log(`User ${user.id} get user by ID : ${id}`);
            return this.mapper.map(found, user_dto_1.UserDto);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException("get User fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createDto) {
        const salt = await bcrypt.genSalt();
        createDto.password = await this.hashPassword(createDto.password, salt);
        const data = Object.assign({ salt }, createDto);
        try {
            const result = await this.userRepo.save(data);
            const saved = class_transformer_1.plainToClass(user_entity_1.UserEntity, result);
            return this.mapper.map(saved, user_dto_1.UserDto);
        }
        catch (error) {
            if (error.code === '23505') {
                this.logger.error(error);
                throw new common_1.HttpException("Username already exists!", common_1.HttpStatus.CONFLICT);
            }
            else {
                this.logger.error(error);
                throw new common_1.HttpException("create User fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async update(id, updateDto, user) {
        await this.getById(id, user);
        await this.userRepo.update(id, updateDto);
        return await this.getById(id, user);
    }
    async login(userData) {
        const { account, password } = userData;
        const user = await this.getByAccount(account);
        const areEqual = await user.validatePassword(password);
        if (!areEqual) {
            throw new common_1.HttpException("Wrong username or password!", common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async changePassword(userData) {
        let status = {
            succes: true,
            message: 'password change success',
        };
        try {
            const { account, password, newPassword } = userData;
            const user = await this.login({ account, password });
            if (!user) {
                return {
                    succes: false,
                    message: "wrong user or password",
                };
            }
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(newPassword, user.salt);
            await user.save();
        }
        catch (err) {
            status = {
                succes: false,
                message: err,
            };
        }
        return status;
    }
    async forgetPassword(account) {
        try {
            const user = await this.getByAccount(account);
            const newPassword = uuid_1.v4();
            const salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(newPassword, salt);
            user.salt = salt;
            await user.save();
            this.logger.log(`New password ${newPassword} for User ${user.id}`);
            return newPassword;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException("generate new password fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(2, nestjsx_automapper_1.InjectMapper()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        logger_service_1.LoggerService,
        nestjsx_automapper_1.AutoMapper])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map