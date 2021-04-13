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
import { CreateDrugTempDto } from '../dto/drug-temp/create-drug-temp.dto';
import { DrugTempDto } from '../dto/drug-temp/drug-temp.dto';
import { FilterDrugTempDto } from '../dto/drug-temp/filter-drug-temp.dto';
import { UpdateDrugTempDto } from '../dto/drug-temp/update-drug-temp.dto';
import { CreateGenotypeDrugTempDto } from '../dto/genotype-drug-temp/create-genotype-drug-temp.dto';
import { FilterGenotypeDrugTempDto } from '../dto/genotype-drug-temp/filter-genotype-drug-temp.dto';
import { GenotypeDrugTempDto } from '../dto/genotype-drug-temp/genotype-drug-temp.dto';
import { DrugTempService } from '../service/drug-temp.service';

@ApiTags('drug_temp')
@Controller()
export class DrugTempController {
  constructor(private readonly drugTempService: DrugTempService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugTempDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/drug_temp')
  async getAllDrugTemp(
    @Query() filterDto: FilterDrugTempDto,
    @User() user: UserDto,
  ): Promise<DrugTempDto[]> {
    const result = await this.drugTempService.getAll(filterDto, user);
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/drug_temp/:drug_temp_id')
  async getDrugTempById(
    @Param('drug_temp_id') drugTempId: string,
    @Query() filterDto: FilterDrugTempDto,
    @User() user: UserDto,
  ): Promise<DrugTempDto> {
    const result = await this.drugTempService.getById(
      drugTempId,
      filterDto,
      user,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DrugTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/drug_temp')
  async createDrugTemp(
    @Body() userData: CreateDrugTempDto,
    @User() user: UserDto,
  ): Promise<DrugTempDto> {
    return this.drugTempService.create(userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('drug_temp/:drug_temp_id')
  async updateDrugTemp(
    @Param('drug_temp_id') drugTempId: string,
    @Body() userData: UpdateDrugTempDto,
    @User() user: UserDto,
  ): Promise<DrugTempDto> {
    return this.drugTempService.update(drugTempId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('drug_temp/:drug_temp_id')
  async deleteDrugTemp(
    @Param('drug_temp_id') drugTempId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.drugTempService.delete(drugTempId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('drug_temp/:drug_temp_id/genotype')
  async createGenotypeDrugTemp(
    @Param('drug_temp_id') drugTempId: string,
    @Body() userData: CreateGenotypeDrugTempDto,
    @User() user: UserDto,
  ): Promise<GenotypeDrugTempDto> {
    return this.drugTempService.createGenotype(drugTempId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DrugTempDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('drug_temp/:drug_temp_id/genotype')
  async getAllGenotypeDrugTemp(
    @Param('drug_temp_id') drugTempId: string,
    @Query() filterDto: FilterGenotypeDrugTempDto,
    @User() user: UserDto,
  ): Promise<GenotypeDrugTempDto[]> {
    const result = await this.drugTempService.getAllGenotypeDrugTemp(
      drugTempId,
      filterDto,
      user,
    );
    return result;
  }
}
