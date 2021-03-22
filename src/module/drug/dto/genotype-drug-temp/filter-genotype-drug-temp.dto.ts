import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class FilterGenotypeDrugTempDto {
  @ApiProperty({required:false})
  language?: language;
}