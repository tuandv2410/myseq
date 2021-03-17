import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    getAll(filterDto: FilterUserDto, user: UserDto): Promise<UserDto[]>;
    getById(userId: string, user: UserDto): Promise<UserDto>;
    create(userData: CreateUserDto): Promise<UserDto>;
    update(userId: string, userData: UpdateUserDto, user: UserDto): Promise<UserDto>;
}
