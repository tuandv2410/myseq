import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateGenotypeDrugReportTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  geneSeq: string;

  @ApiProperty()
  phenotype: string;

}
export class CreateGenotypeDrugReportDto {
  @ApiProperty()
  level: number;

  @ApiProperty({type:CreateGenotypeDrugReportTransDto, isArray:true})
  createGenotypeDrugReportTrans: CreateGenotypeDrugReportTransDto[]

}



