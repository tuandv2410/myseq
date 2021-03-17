import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateDiseaseReportTransDto{
  @ApiProperty()
  language: language
  @ApiProperty()
  draftConclusion: string;
}
export class UpdateDiseaseReportDto {
  
  @ApiProperty({type:UpdateDiseaseReportTransDto, isArray:true})
  updateDiseaseReportTrans: UpdateDiseaseReportTransDto[];

}