import { UserEntity } from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { LoginUserDto } from '../auth/dto/login.user.dto';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { LoggerService } from 'src/logger/logger.service';
import { UserDto } from './dto/user.dto';
import { AutoMapper } from 'nestjsx-automapper';
export declare class UserService {
    private userRepo;
    private logger;
    private mapper;
    constructor(userRepo: Repository<UserEntity>, logger: LoggerService, mapper: AutoMapper);
    getAll(filterDto: FilterUserDto, user: UserDto): Promise<UserDto[]>;
    getByAccount(account: string): Promise<UserEntity>;
    getById(id: string, user: UserDto): Promise<UserDto>;
    create(createDto: CreateUserDto): Promise<UserDto>;
    update(id: string, updateDto: UpdateUserDto, user: UserDto): Promise<UserDto>;
    login(userData: LoginUserDto): Promise<UserEntity>;
    changePassword(userData: ChangePasswordDto): Promise<ResultInterface>;
    forgetPassword(account: string): Promise<string>;
    hashPassword(password: string, salt: string): Promise<string>;
}
