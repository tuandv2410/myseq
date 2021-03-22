import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateNutritionTempTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty({required: false})
  description?: string;

  @ApiProperty({required: false})
  advice?: string;

}

export class UpdateNutritionTempDto {

  @ApiProperty({type: UpdateNutritionTempTransDto, isArray:true, required: false})
  updateNutritionTempTrans?: UpdateNutritionTempTransDto[]

  @ApiProperty({required: false})
  nutritionCategoryId?: string;
}
