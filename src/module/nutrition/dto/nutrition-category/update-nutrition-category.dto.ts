import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateNutritionCategoryTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty({required: false})
  name?: string;

  @ApiProperty({required: false})
  description?: string;
}

export class UpdateNutritionCategoryDto {

  @ApiProperty({type:UpdateNutritionCategoryTransDto, isArray: true})
  updateNutritionCategoryTrans: UpdateNutritionCategoryTransDto[]

}


