import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResultInterface } from 'src/interfaces/result.interface';
import { User } from '../../auth/get-user.decorator';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { UserDto } from '../../user/dto/user.dto';
import { CreateNutritionCategoryDto } from '../dto/nutrition-category/create-nutrition-category.dto';
import { NutritionCategoryDto } from '../dto/nutrition-category/nutrition-category.dto';
import { FilterNutritionCategoryDto } from '../dto/nutrition-category/filter-nutrition-category.dto';
import { ReportListNutritionDto } from '../dto/nutrition-category/report-list.dto';
import { UpdateNutritionCategoryDto } from '../dto/nutrition-category/update-nutrition-category.dto';
import { NutritionCategoryService } from '../service/nutrition-category.service';
import { NutritionCategoryByUserDto } from '../dto/nutrition-category/nutrition-category-by-user.dto';

@ApiTags("nutrition_category")
@Controller("nutrition_category")
export class NutritionCategoryController {
  constructor(
    private readonly nutritionCategoryService: NutritionCategoryService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionCategoryDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get()
  async getAllNutritionCategory(
    @Query() filterDto: FilterNutritionCategoryDto,
    @User() user: UserDto,
  ): Promise<NutritionCategoryDto[]> {
    const result = await this.nutritionCategoryService.getAll(filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionCategoryByUserDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/user/:userId")
  async getAllDiseaseCategoryByUser(
    @Param() userId: string,
    @Query() filterDto: FilterNutritionCategoryDto,
    @User() user: UserDto,
  ): Promise<NutritionCategoryByUserDto[]> {
    const result = await this.nutritionCategoryService.getAllByUser(userId, filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/:nutrition_category_id")
  async getNutritionCategoryById(
    @Param('nutrition_category_id') nutritionCategoryId: string,
    @Query() filterDto: FilterNutritionCategoryDto,
    @User() user: UserDto,
  ): Promise<NutritionCategoryDto> {
    const result = await this.nutritionCategoryService.getById(nutritionCategoryId,filterDto, user)
    return result;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: NutritionCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('admin')
  @Post()
  async createNutritionCategory(
    @Body() userData: CreateNutritionCategoryDto,
    @User() user: UserDto,
  ): Promise<NutritionCategoryDto> {
    return this.nutritionCategoryService.create(userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: NutritionCategoryDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Put("/:nutrition_category_id")
  async updateNutritionCategory(
    @Param("nutrition_category_id") nutritionCategoryId: string,
    @Body() userData: UpdateNutritionCategoryDto,
    @User() user: UserDto,
  ): Promise<NutritionCategoryDto> {
    return this.nutritionCategoryService.update(nutritionCategoryId,userData, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles("admin")
  @Delete("/:nutrition_category_id")
  async deleteNutritionCategory(
    @Param('nutrition_category_id') nutritionCategoryId: string,
    @User() user: UserDto,
  ): Promise<ResultInterface> {
    return this.nutritionCategoryService.delete(nutritionCategoryId, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ReportListNutritionDto,
  })
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('user', 'expert', 'admin')
  @Get("/:nutrition_category_id/user/:userId")
  async nutritionUserReportListView(
    @Param('userId') userId: string,
    @Param('nutrition_category_id') nutritionReportId: string,
    @Query() filterDto: FilterNutritionCategoryDto,
    @User() user: UserDto,
  ): Promise<ReportListNutritionDto> {
    console.log("Get");
    const result = await this.nutritionCategoryService.getNutritionReportListByCategory(userId, nutritionReportId,filterDto, user)
    return result;
  }

}
