import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { language } from "src/enum/language.enum";

export class CreateNutritionCategoryTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  description?: string;
}

export class CreateNutritionCategoryDto {
  @ApiProperty({type:CreateNutritionCategoryTransDto, isArray:true })
  nutritionCategoryTrans: CreateNutritionCategoryTransDto[];
}


