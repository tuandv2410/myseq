import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class FilterDiseaseReportDto {
  @ApiProperty({required:false})
  language?: language;
}