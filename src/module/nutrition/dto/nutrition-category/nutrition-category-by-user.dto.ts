import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { NutritionCategoryTransDto } from './nutrition-category.dto';

export class NutritionCategoryByUserDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap(() => NutritionCategoryTransDto)
  @ApiProperty({ type: NutritionCategoryTransDto, isArray: true })
  nutritionCategoryTrans: NutritionCategoryTransDto[];

  @ApiProperty()
  new: boolean
}