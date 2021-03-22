import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateDrugReportTransDto{
  @ApiProperty()
  language: language
  @ApiProperty()
  draftConclusion: string;
}
export class UpdateDrugReportDto {
  
  @ApiProperty({type:UpdateDrugReportTransDto, isArray:true})
  updateDrugReportTrans: UpdateDrugReportTransDto[];

}