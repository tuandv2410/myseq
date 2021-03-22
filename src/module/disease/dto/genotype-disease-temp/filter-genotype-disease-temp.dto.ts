import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class FilterGenotypeDiseaseTempDto {
  @ApiProperty({required:false})
  language?: language;
}