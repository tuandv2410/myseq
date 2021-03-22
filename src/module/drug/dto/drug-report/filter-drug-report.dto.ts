import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class FilterDrugReportDto {
  @ApiProperty({required:false})
  language?: language;
}