import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResultInterface } from 'src/interfaces/result.interface';
import { User } from '../../auth/get-user.decorator';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { UserDto } from '../../user/dto/user.dto';
import { CreateDiseaseReportDto } from '../dto/disease-report/create-disease-report.dto';
import { DiseaseReportDto } from '../dto/disease-report/disease-report.dto';
import { FilterDiseaseReportDto } from '../dto/disease-report/filter-disease-report.dto';
import { UpdateDiseaseReportDto } from '../dto/disease-report/update-disease-report.dto';
import { CreateGenotypeDiseaseReportDto } from '../dto/genotype-disease-report/create-genotype-disease-report.dto';
import { FilterGenotypeDiseaseReportDto } from '../dto/genotype-disease-report/filter-genotype-disease-report.dto';
import { GenotypeDiseaseReportDto } from '../dto/genotype-disease-report/genotype-disease-report.dto';
import { DiseaseReportService } from '../service/disease-report.service';

@ApiTags("disease_report")
@Controller()
export class DiseaseReportController {
  constructor(
    private readonly diseaseReportService: DiseaseReportService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseReportDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/user/:userId/disease_report")
  async getAllDiseaseReport(
    @Param("userId") userId: string,
    @Query() filterDto: FilterDiseaseReportDto,
    @User() user: UserDto,
  ): Promise<DiseaseReportDto[]> {
    const result = await this.diseaseReportService.getAll(userId,filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/user/:userId/disease_report/:disease_report_id")
  async getDiseaseReportById(
    @Param('userId') userId: string,
    @Query() filterDto: FilterDiseaseReportDto,
    @Param('disease_report_id') diseaseReportId: string,
    @User() user: UserDto,
  ): Promise<DiseaseReportDto> {
    const result = await this.diseaseReportService.getById(userId, diseaseReportId,filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DiseaseReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('admin')
  @Post("/user/:userId/disease_report")
  async createDiseaseReport(
    @Param('userId') userId: string,
    @Body() userData: CreateDiseaseReportDto,
    @User() user: UserDto,
  ): Promise<DiseaseReportDto> {
    return this.diseaseReportService.create(userId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Put("/user/:userId/disease_report/:disease_report_id")
  async updateDiseaseReport(
    @Param('userId') userId: string,
    @Param("disease_report_id") diseaseReportId: string,
    @Body() userData: UpdateDiseaseReportDto,
    @User() user: UserDto,
  ): Promise<DiseaseReportDto> {
    return this.diseaseReportService.update(userId, diseaseReportId,userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("expertboss", "admin")
  @Put("/user/:userId/disease_report/:disease_report_id/approve")
  async approveDiseaseReport(
    @Param('userId') userId: string,
    @Param("disease_report_id") diseaseReportId: string,
    @User() user: UserDto,
  ): Promise<DiseaseReportDto> {
    return this.diseaseReportService.approve(userId, diseaseReportId,user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Delete("/user/:userId/disease_report/:disease_report_id")
  async deleteDiseaseReport(
    @Param('userId') userId: string,
    @Param('disease_report_id') diseaseReportId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.diseaseReportService.delete(userId, diseaseReportId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseReportDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('admin')
  @Post("/disease_report/:disease_report_id/genotype")
  async createGenotypeDiseaseReport(
    @Param('disease_report_id') diseaseReportId: string,
    @Body() userData: CreateGenotypeDiseaseReportDto,
    @User() user: UserDto,
  ): Promise<GenotypeDiseaseReportDto> {
    return this.diseaseReportService.createGenotype(diseaseReportId,userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseReportDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/disease_report/:disease_report_id/genotype")
  async getAllGenotypeDiseaseReport(
    @Param('disease_report_id') diseaseReportId: string,
    @Query() filterDto: FilterGenotypeDiseaseReportDto,
    @User() user: UserDto,
  ): Promise<GenotypeDiseaseReportDto[]> {
    const result = await this.diseaseReportService.getAllGenotypeDiseaseReport(diseaseReportId,filterDto, user)
    return result;
  }

}
