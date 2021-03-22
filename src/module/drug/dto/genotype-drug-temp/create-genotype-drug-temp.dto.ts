import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateGenotypeDrugTempTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  geneSeq: string;

  @ApiProperty()
  phenotype: string;

}
export class CreateGenotypeDrugTempDto {
  @ApiProperty()
  level: number;

  @ApiProperty({type:CreateGenotypeDrugTempTransDto, isArray:true})
  createGenotypeDrugReportTrans: CreateGenotypeDrugTempTransDto[]

}



