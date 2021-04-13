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
import { CreateDrugReportDto } from '../dto/drug-report/create-drug-report.dto';
import { DrugReportDto } from '../dto/drug-report/drug-report.dto';
import { FilterDrugReportDto } from '../dto/drug-report/filter-drug-report.dto';
import { UpdateDrugReportDto } from '../dto/drug-report/update-drug-report.dto';
import { CreateGenotypeDrugReportDto } from '../dto/genotype-drug-report/create-genotype-drug-report.dto';
import { FilterGenotypeDrugReportDto } from '../dto/genotype-drug-report/filter-genotype-drug-report.dto';
import { GenotypeDrugReportDto } from '../dto/genotype-drug-report/genotype-drug-report.dto';
import { DrugReportService } from '../service/drug-report.service';

@ApiTags('drug_report')
@Controller()
export class DrugReportController {
  constructor(private readonly drugReportService: DrugReportService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugReportDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/user/:userId/drug_report')
  async getAllDrugReport(
    @Param('userId') userId: string,
    @Query() filterDto: FilterDrugReportDto,
    @User() user: UserDto,
  ): Promise<DrugReportDto[]> {
    const result = await this.drugReportService.getAll(userId, filterDto, user);
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugReportDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/user/:userId/drug_report/:drug_report_id')
  async getDrugReportById(
    @Param('userId') userId: string,
    @Query() filterDto: FilterDrugReportDto,
    @Param('drug_report_id') drugReportId: string,
    @User() user: UserDto,
  ): Promise<DrugReportDto> {
    const result = await this.drugReportService.getById(
      userId,
      drugReportId,
      filterDto,
      user,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DrugReportDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/user/:userId/drug_report')
  async createDrugReport(
    @Param('userId') userId: string,
    @Body() userData: CreateDrugReportDto,
    @User() user: UserDto,
  ): Promise<DrugReportDto> {
    return this.drugReportService.create(userId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugReportDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'expert', 'expertboss')
  @Put('/user/:userId/drug_report/:drug_report_id')
  async updateDrugReport(
    @Param('userId') userId: string,
    @Param('drug_report_id') drugReportId: string,
    @Body() userData: UpdateDrugReportDto,
    @User() user: UserDto,
  ): Promise<DrugReportDto> {
    return this.drugReportService.update(userId, drugReportId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugReportDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('expertboss', 'admin')
  @Put('/user/:userId/drug_report/:drug_report_id/approve')
  async approveDrugReport(
    @Param('userId') userId: string,
    @Param('drug_report_id') drugReportId: string,
    @User() user: UserDto,
  ): Promise<DrugReportDto> {
    return this.drugReportService.approve(userId, drugReportId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('/user/:userId/drug_report/:drug_report_id')
  async deleteDrugReport(
    @Param('userId') userId: string,
    @Param('drug_report_id') drugReportId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.drugReportService.delete(userId, drugReportId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugReportDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/drug_report/:drug_report_id/genotype')
  async createGenotypeDrugReport(
    @Param('drug_report_id') drugReportId: string,
    @Body() userData: CreateGenotypeDrugReportDto,
    @User() user: UserDto,
  ): Promise<GenotypeDrugReportDto> {
    return this.drugReportService.createGenotype(drugReportId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugReportDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/drug_report/:drug_report_id/genotype')
  async getAllGenotypeDrugReport(
    @Param('drug_report_id') drugReportId: string,
    @Query() filterDto: FilterGenotypeDrugReportDto,
    @User() user: UserDto,
  ): Promise<GenotypeDrugReportDto[]> {
    const result = await this.drugReportService.getAllGenotypeDrugReport(
      drugReportId,
      filterDto,
      user,
    );
    return result;
  }
}
