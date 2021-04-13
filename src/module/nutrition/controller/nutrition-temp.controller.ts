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
import { CreateNutritionTempDto } from '../dto/nutrition-temp/create-nutrition-temp.dto';
import { NutritionTempDto } from '../dto/nutrition-temp/nutrition-temp.dto';
import { FilterNutritionTempDto } from '../dto/nutrition-temp/filter-nutrition-temp.dto';
import { UpdateNutritionTempDto } from '../dto/nutrition-temp/update-nutrition-temp.dto';
import { CreateGenotypeNutritionTempDto } from '../dto/genotype-nutrition-temp/create-genotype-nutrition-temp.dto';
import { FilterGenotypeNutritionTempDto } from '../dto/genotype-nutrition-temp/filter-genotype-nutrition-temp.dto';
import { GenotypeNutritionTempDto } from '../dto/genotype-nutrition-temp/genotype-nutrition-temp.dto';
import { NutritionTempService } from '../service/nutrition-temp.service';

@ApiTags('nutrition_temp')
@Controller()
export class NutritionTempController {
  constructor(private readonly nutritionTempService: NutritionTempService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionTempDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/nutrition_temp')
  async getAllNutritionTemp(
    @Query() filterDto: FilterNutritionTempDto,
    @User() user: UserDto,
  ): Promise<NutritionTempDto[]> {
    const result = await this.nutritionTempService.getAll(filterDto, user);
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('/nutrition_temp/:nutrition_temp_id')
  async getNutritionTempById(
    @Param('nutrition_temp_id') nutritionTempId: string,
    @Query() filterDto: FilterNutritionTempDto,
    @User() user: UserDto,
  ): Promise<NutritionTempDto> {
    const result = await this.nutritionTempService.getById(
      nutritionTempId,
      filterDto,
      user,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: NutritionTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/nutrition_temp')
  async createNutritionTemp(
    @Body() userData: CreateNutritionTempDto,
    @User() user: UserDto,
  ): Promise<NutritionTempDto> {
    return this.nutritionTempService.create(userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('nutrition_temp/:nutrition_temp_id')
  async updateNutritionTemp(
    @Param('nutrition_temp_id') nutritionTempId: string,
    @Body() userData: UpdateNutritionTempDto,
    @User() user: UserDto,
  ): Promise<NutritionTempDto> {
    return this.nutritionTempService.update(nutritionTempId, userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('nutrition_temp/:nutrition_temp_id')
  async deleteNutritionTemp(
    @Param('nutrition_temp_id') nutritionTempId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.nutritionTempService.delete(nutritionTempId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionTempDto,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('nutrition_temp/:nutrition_temp_id/genotype')
  async createGenotypeNutritionTemp(
    @Param('nutrition_temp_id') nutritionTempId: string,
    @Body() userData: CreateGenotypeNutritionTempDto,
    @User() user: UserDto,
  ): Promise<GenotypeNutritionTempDto> {
    return this.nutritionTempService.createGenotype(
      nutritionTempId,
      userData,
      user,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionTempDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'expert', 'admin', 'expertboss')
  @Get('nutrition_temp/:nutrition_temp_id/genotype')
  async getAllGenotypeNutritionTemp(
    @Param('nutrition_temp_id') nutritionTempId: string,
    @Query() filterDto: FilterGenotypeNutritionTempDto,
    @User() user: UserDto,
  ): Promise<GenotypeNutritionTempDto[]> {
    const result = await this.nutritionTempService.getAllGenotypeNutritionTemp(
      nutritionTempId,
      filterDto,
      user,
    );
    return result;
  }
}
