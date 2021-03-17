import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../auth/dto/login.user.dto';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { LoggerService } from 'src/logger/logger.service';
import { UserDto } from './dto/user.dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { plainToClass } from 'class-transformer';
import { gender } from 'src/enum/gender.enum';
import { role } from 'src/enum/role.enum';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private logger: LoggerService,
    @InjectMapper()
    private mapper: AutoMapper,
  ){
    this.mapper.createMap(UserEntity,UserDto);
  }

  async getAll(
    filterDto: FilterUserDto,
    user: UserDto,
  ): Promise<UserDto[]>{
    try{
      const result = await this.userRepo.find({where:filterDto})
      this.logger.log(`User ${user.id} get users by filter: ${filterDto}`)
      return this.mapper.mapArray(result, UserDto)
    }catch(error) {
      this.logger.error(error);
      throw new HttpException("get Users fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async getByAccount(
    account: string,
  ): Promise<UserEntity>{
    try{
      const found = await this.userRepo.findOne({where:{account:account}})
      
      if(!found){
        throw new HttpException(`User with account ${account} not found`, HttpStatus.NOT_FOUND);
      }
      return found;
    }catch(error) {
      this.logger.error(error);
      throw new HttpException("get User fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(
    id: string,
    user: UserDto
  ): Promise<UserDto>{
    try{
      const found = await this.userRepo.findOne(id);
      if (!found) {
        throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      this.logger.log(`User ${user.id} get user by ID : ${id}`)
      
      return this.mapper.map(found,UserDto);
    }catch(error) {
      this.logger.error(error);
      throw new HttpException("get User fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async create(
    createDto: CreateUserDto
  ): Promise<UserDto>{
    const salt = await bcrypt.genSalt();
    createDto.password = await this.hashPassword(createDto.password, salt);
    const data = {salt, ...createDto};
    try{
      const result = await this.userRepo.save(data);
      const saved = plainToClass(UserEntity, result);
      return this.mapper.map(saved, UserDto);
    }catch (error) {
      if (error.code === '23505') { // duplicate username
        this.logger.error(error);
        throw new HttpException("Username already exists!", HttpStatus.CONFLICT);
      } else {
        this.logger.error(error);
        throw new HttpException("create User fail!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  }

  async update(
    id: string,
    updateDto: UpdateUserDto,
    user: UserDto
  ): Promise<UserDto>{
    await this.getById(id, user);
    await this.userRepo.update(id,updateDto);
    return await this.getById(id, user);
  }

  async login(userData: LoginUserDto): Promise<UserEntity> {
    const { account, password } = userData;

    const user = await this.getByAccount(account);
    
    const areEqual = await user.validatePassword(password);

    if (!areEqual) {
      throw new HttpException("Wrong username or password!", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async changePassword(userData: ChangePasswordDto): Promise<ResultInterface> {
    let status: ResultInterface = {
      succes: true,
      message: 'password change success',
    };
    try {
      const { account, password, newPassword } = userData;
      const user = await this.login({account,password});
      if (!user) {
        return {
          succes: false,
          message: "wrong user or password",
        }
      }
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(newPassword, user.salt);
      await user.save();
    }catch (err) {
      status = {
        succes: false,
        message: err,
      };
    }
    return status;
  }

  async forgetPassword(account: string): Promise<string> {
    try {
      const user = await this.getByAccount(account);
      const newPassword = uuid();
      const salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(newPassword, salt);
      user.salt = salt;
      await user.save();
      this.logger.log(`New password ${newPassword} for User ${user.id}`);
      return newPassword;
    } catch(error){
      this.logger.error(error);
      throw new HttpException("generate new password fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
