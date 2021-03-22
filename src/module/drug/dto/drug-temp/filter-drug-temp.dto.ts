import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class FilterDrugTempDto {
  @ApiProperty({required:false})
  language?: language;
}
