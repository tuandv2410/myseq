import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateNutritionReportTransDto {
  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  draftConclusion?: string;

  @ApiProperty({required: false})
  finalConclusion?: string;

  @ApiProperty()
  language: language;
}

export class CreateNutritionReportDto {

  @ApiProperty()
  nutritionTempId: string;

  @ApiProperty({type:CreateNutritionReportTransDto, isArray: true})
  nutritionReportTrans: CreateNutritionReportTransDto[]

}

