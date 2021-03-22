import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateNutritionReportTransDto{
  @ApiProperty()
  language: language
  @ApiProperty()
  draftConclusion: string;
}
export class UpdateNutritionReportDto {
  
  @ApiProperty({type:UpdateNutritionReportTransDto, isArray:true})
  updateNutritionReportTrans: UpdateNutritionReportTransDto[];

}