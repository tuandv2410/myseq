import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResultInterface } from 'src/interfaces/result.interface';
import { User } from '../../auth/get-user.decorator';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { UserDto } from '../../user/dto/user.dto';
import { CreateDrugCategoryDto } from '../dto/drug-category/create-drug-category.dto';
import { DrugCategoryByUserDto } from '../dto/drug-category/drug-category-by-user.dto';
import { DrugCategoryDto } from '../dto/drug-category/drug-category.dto';
import { FilterDrugCategoryDto } from '../dto/drug-category/filter-drug-category.dto';
import { ReportListDrugDto } from '../dto/drug-category/report-list.dto';
import { UpdateDrugCategoryDto } from '../dto/drug-category/update-drug-category.dto';
import { DrugCategoryService } from '../service/drug-category.service';

@ApiTags('drug_category')
@Controller('drug_category')
export class DrugCategoryController {
  constructor(private readonly drugCategoryService: DrugCategoryService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugCategoryDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get()
  async getAllDrugCategory(
    @Query() filterDto: FilterDrugCategoryDto,
    @User() user: UserDto,
  ): Promise<DrugCategoryDto[]> {
    const result = await this.drugCategoryService.getAll(filterDto, user);
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugCategoryByUserDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/user/:userId')
  async getAllDiseaseCategoryByUser(
    @Param('userId') userId: string,
    @Query() filterDto: FilterDrugCategoryDto,
    @User() user: UserDto,
  ): Promise<DrugCategoryByUserDto[]> {
    const result = await this.drugCategoryService.getAllByUser(
      userId,
      filterDto,
      user,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/:drug_category_id')
  async getDrugCategoryById(
    @Param('drug_category_id') drugCategoryId: string,
    @Query() filterDto: FilterDrugCategoryDto,
    @User() user: UserDto,
  ): Promise<DrugCategoryDto> {
    const result = await this.drugCategoryService.getById(
      drugCategoryId,
      filterDto,
      user,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DrugCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  async createDrugCategory(
    @Body() userData: CreateDrugCategoryDto,
    @User() user: UserDto,
  ): Promise<DrugCategoryDto> {
    return this.drugCategoryService.create(userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('/:drug_category_id')
  async updateDrugCategory(
    @Param('drug_category_id') drugCategoryId: string,
    @Body() userData: UpdateDrugCategoryDto,
    @User() user: UserDto,
  ): Promise<DrugCategoryDto> {
    return this.drugCategoryService.update(drugCategoryId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('/:drug_category_id')
  async deleteDrugCategory(
    @Param('drug_category_id') drugCategoryId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.drugCategoryService.delete(drugCategoryId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ReportListDrugDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/:drug_category_id/user/:userId')
  async drugUserReportListView(
    @Param('userId') userId: string,
    @Param('drug_category_id') drugReportId: string,
    @Query() filterDto: FilterDrugCategoryDto,
    @User() user: UserDto,
  ): Promise<ReportListDrugDto> {
    console.log('Get');
    const result = await this.drugCategoryService.getDrugReportListByCategory(
      userId,
      drugReportId,
      filterDto,
      user,
    );
    return result;
  }
}
