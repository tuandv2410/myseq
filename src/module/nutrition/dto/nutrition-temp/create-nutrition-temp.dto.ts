import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateNutritionTempTransDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  advice: string;

  @ApiProperty()
  language: language;

}

export class CreateNutritionTempDto {
  @ApiProperty({type:CreateNutritionTempTransDto, isArray:true})
  nutritionTempTrans: CreateNutritionTempTransDto[];

  @ApiProperty()
  nutritionCategoryId: string;
}
