import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResultInterface } from 'src/interfaces/result.interface';
import { User } from '../../auth/get-user.decorator';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { UserDto } from '../../user/dto/user.dto';
import { CreateNutritionReportDto } from '../dto/nutrition-report/create-nutrition-report.dto';
import { NutritionReportDto } from '../dto/nutrition-report/nutrition-report.dto';
import { FilterNutritionReportDto } from '../dto/nutrition-report/filter-nutrition-report.dto';
import { UpdateNutritionReportDto } from '../dto/nutrition-report/update-nutrition-report.dto';
import { CreateGenotypeNutritionReportDto } from '../dto/genotype-nutrition-report/create-genotype-nutrition-report.dto';
import { FilterGenotypeNutritionReportDto } from '../dto/genotype-nutrition-report/filter-genotype-nutrition-report.dto';
import { GenotypeNutritionReportDto } from '../dto/genotype-nutrition-report/genotype-nutrition-report.dto';
import { NutritionReportService } from '../service/nutrition-report.service';

@ApiTags("nutrition_report")
@Controller()
export class NutritionReportController {
  constructor(
    private readonly nutritionReportService: NutritionReportService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionReportDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/user/:userId/nutrition_report")
  async getAllNutritionReport(
    @Param("userId") userId: string,
    @Query() filterDto: FilterNutritionReportDto,
    @User() user: UserDto,
  ): Promise<NutritionReportDto[]> {
    const result = await this.nutritionReportService.getAll(userId,filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/user/:userId/nutrition_report/:nutrition_report_id")
  async getNutritionReportById(
    @Param('userId') userId: string,
    @Query() filterDto: FilterNutritionReportDto,
    @Param('nutrition_report_id') nutritionReportId: string,
    @User() user: UserDto,
  ): Promise<NutritionReportDto> {
    const result = await this.nutritionReportService.getById(userId, nutritionReportId,filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: NutritionReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('admin')
  @Post("/user/:userId/nutrition_report")
  async createNutritionReport(
    @Param('userId') userId: string,
    @Body() userData: CreateNutritionReportDto,
    @User() user: UserDto,
  ): Promise<NutritionReportDto> {
    return this.nutritionReportService.create(userId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Put("/user/:userId/nutrition_report/:nutrition_report_id")
  async updateNutritionReport(
    @Param('userId') userId: string,
    @Param("nutrition_report_id") nutritionReportId: string,
    @Body() userData: UpdateNutritionReportDto,
    @User() user: UserDto,
  ): Promise<NutritionReportDto> {
    return this.nutritionReportService.update(userId, nutritionReportId,userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("expertboss", "admin")
  @Put("/user/:userId/nutrition_report/:nutrition_report_id/approve")
  async approveNutritionReport(
    @Param('userId') userId: string,
    @Param("nutrition_report_id") nutritionReportId: string,
    @User() user: UserDto,
  ): Promise<NutritionReportDto> {
    return this.nutritionReportService.approve(userId, nutritionReportId,user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Delete("/user/:userId/nutrition_report/:nutrition_report_id")
  async deleteNutritionReport(
    @Param('userId') userId: string,
    @Param('nutrition_report_id') nutritionReportId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.nutritionReportService.delete(userId, nutritionReportId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('admin')
  @Post("/nutrition_report/:nutrition_report_id/genotype")
  async createGenotypeNutritionReport(
    @Param('nutrition_report_id') nutritionReportId: string,
    @Body() userData: CreateGenotypeNutritionReportDto,
    @User() user: UserDto,
  ): Promise<GenotypeNutritionReportDto> {
    return this.nutritionReportService.createGenotype(nutritionReportId,userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionReportDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/nutrition_report/:nutrition_report_id/genotype")
  async getAllGenotypeNutritionReport(
    @Param('nutrition_report_id') nutritionReportId: string,
    @Query() filterDto: FilterGenotypeNutritionReportDto,
    @User() user: UserDto,
  ): Promise<GenotypeNutritionReportDto[]> {
    const result = await this.nutritionReportService.getAllGenotypeNutritionReport(nutritionReportId,filterDto, user)
    return result;
  }

}
