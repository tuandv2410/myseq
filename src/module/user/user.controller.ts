import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/get-user.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('expert','admin')
  @Get()
  async getAll(
    @Query() filterDto: FilterUserDto,
    @User() user: UserDto,
  ): Promise<UserDto[]> {
    const result = await this.service.getAll(filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user','expert','admin')
  @Get("/:userId")
  async getById(
    @Param('userId') userId: string,
    @User() user: UserDto,
  ): Promise<UserDto> {
    return this.service.getById(userId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
  })
  // @UseGuards(AuthGuard('jwt'),RolesGuard)
  // @Roles('admin')
  @Post()
  async create(
    @Body() userData: CreateUserDto
  ): Promise<UserDto> {
    return this.service.create(userData);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user','admin')
  @Put("/:userId")
  async update(
    @Param("userId") userId: string,
    @Body() userData: UpdateUserDto,
    @User() user: UserDto,
  ): Promise<UserDto> {
    return this.service.update(userId,userData, user);
  }
}
