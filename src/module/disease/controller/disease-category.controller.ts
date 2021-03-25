import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResultInterface } from 'src/interfaces/result.interface';
import { User } from '../../auth/get-user.decorator';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { UserDto } from '../../user/dto/user.dto';
import { CreateDiseaseCategoryDto } from '../dto/disease-category/create-disease-category.dto';
import { DiseaseCategoryDto } from '../dto/disease-category/disease-category.dto';
import { FilterDiseaseCategoryDto } from '../dto/disease-category/filter-disease-category.dto';
import { ReportListDiseaseDto } from '../dto/disease-category/report-list.dto';
import { UpdateDiseaseCategoryDto } from '../dto/disease-category/update-disease-category.dto';
import { DiseaseCategoryService } from '../service/disease-category.service';

@ApiTags("disease_category")
@Controller("disease_category")
export class DiseaseCategoryController {
  constructor(
    private readonly diseaseCategoryService: DiseaseCategoryService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseCategoryDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get()
  async getAllDiseaseCategory(
    @Query() filterDto: FilterDiseaseCategoryDto,
    @User() user: UserDto,
  ): Promise<DiseaseCategoryDto[]> {
    const result = await this.diseaseCategoryService.getAll(filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/:disease_category_id")
  async getDiseaseCategoryById(
    @Param('disease_category_id') diseaseCategoryId: string,
    @Query() filterDto: FilterDiseaseCategoryDto,
    @User() user: UserDto,
  ): Promise<DiseaseCategoryDto> {
    const result = await this.diseaseCategoryService.getById(diseaseCategoryId,filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DiseaseCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('admin')
  @Post()
  async createDiseaseCategory(
    @Body() userData: CreateDiseaseCategoryDto,
    @User() user: UserDto,
  ): Promise<DiseaseCategoryDto> {
    return this.diseaseCategoryService.create(userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Put("/:disease_category_id")
  async updateDiseaseCategory(
    @Param("disease_category_id") diseaseCategoryId: string,
    @Body() userData: UpdateDiseaseCategoryDto,
    @User() user: UserDto,
  ): Promise<DiseaseCategoryDto> {
    return this.diseaseCategoryService.update(diseaseCategoryId,userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Delete("/:disease_category_id")
  async deleteDiseaseCategory(
    @Param('disease_category_id') diseaseCategoryId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.diseaseCategoryService.delete(diseaseCategoryId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ReportListDiseaseDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/:disease_category_id/user/:userId")
  async diseaseUserReportListView(
    @Param('userId') userId: string,
    @Param('disease_category_id') diseaseReportId: string,
    @Query() filterDto: FilterDiseaseCategoryDto,
    @User() user: UserDto,
  ): Promise<ReportListDiseaseDto> {
    console.log("Get");
    const result = await this.diseaseCategoryService.getDiseaseReportListByCategory(userId, diseaseReportId,filterDto, user)
    return result;
  }

}
