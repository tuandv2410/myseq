import { ApiProperty } from "@nestjs/swagger";
import { isArray } from "class-validator";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class NutritionCategoryTransDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  language: language;
}

export class NutritionCategoryDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap(()=>NutritionCategoryTransDto)
  @ApiProperty({type:NutritionCategoryTransDto, isArray:true })
  nutritionCategoryTrans: NutritionCategoryTransDto[]
}


