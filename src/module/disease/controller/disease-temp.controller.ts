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
import { CreateDiseaseTempDto } from '../dto/disease-temp/create-disease-temp.dto';
import { DiseaseTempDto } from '../dto/disease-temp/disease-temp.dto';
import { FilterDiseaseTempDto } from '../dto/disease-temp/filter-disease-temp.dto';
import { UpdateDiseaseTempDto } from '../dto/disease-temp/update-disease-temp.dto';
import { CreateGenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/create-genotype-disease-temp.dto';
import { FilterGenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/filter-genotype-disease-temp.dto';
import { GenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/genotype-disease-temp.dto';
import { DiseaseTempService } from '../service/disease-temp.service';

@ApiTags('disease_temp')
@Controller()
export class DiseaseTempController {
  constructor(private readonly diseaseTempService: DiseaseTempService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseTempDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/disease_temp')
  async getAllDiseaseTemp(
    @Query() filterDto: FilterDiseaseTempDto,
    @User() user: UserDto,
  ): Promise<DiseaseTempDto[]> {
    const result = await this.diseaseTempService.getAll(filterDto, user);
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/disease_temp/:disease_temp_id')
  async getDiseaseTempById(
    @Param('disease_temp_id') diseaseTempId: string,
    @Query() filterDto: FilterDiseaseTempDto,
    @User() user: UserDto,
  ): Promise<DiseaseTempDto> {
    const result = await this.diseaseTempService.getById(
      diseaseTempId,
      filterDto,
      user,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DiseaseTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/disease_temp')
  async createDiseaseTemp(
    @Body() userData: CreateDiseaseTempDto,
    @User() user: UserDto,
  ): Promise<DiseaseTempDto> {
    return this.diseaseTempService.create(userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('disease_temp/:disease_temp_id')
  async updateDiseaseTemp(
    @Param('disease_temp_id') diseaseTempId: string,
    @Body() userData: UpdateDiseaseTempDto,
    @User() user: UserDto,
  ): Promise<DiseaseTempDto> {
    return this.diseaseTempService.update(diseaseTempId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('disease_temp/:disease_temp_id')
  async deleteDiseaseTemp(
    @Param('disease_temp_id') diseaseTempId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.diseaseTempService.delete(diseaseTempId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('disease_temp/:disease_temp_id/genotype')
  async createGenotypeDiseaseTemp(
    @Param('disease_temp_id') diseaseTempId: string,
    @Body() userData: CreateGenotypeDiseaseTempDto,
    @User() user: UserDto,
  ): Promise<GenotypeDiseaseTempDto> {
    return this.diseaseTempService.createGenotype(
      diseaseTempId,
      userData,
      user,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DiseaseTempDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'expertboss', 'admin')
  @Get('disease_temp/:disease_temp_id/genotype')
  async getAllGenotypeDiseaseTemp(
    @Param('disease_temp_id') diseaseTempId: string,
    @Query() filterDto: FilterGenotypeDiseaseTempDto,
    @User() user: UserDto,
  ): Promise<GenotypeDiseaseTempDto[]> {
    const result = await this.diseaseTempService.getAllGenotypeDiseaseTemp(
      diseaseTempId,
      filterDto,
      user,
    );
    return result;
  }
}
