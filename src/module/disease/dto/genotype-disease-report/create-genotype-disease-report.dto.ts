import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateGenotypeDiseaseReportTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  geneSeq: string;

  @ApiProperty()
  phenotype: string;

}
export class CreateGenotypeDiseaseReportDto {
  @ApiProperty()
  level: number;

  @ApiProperty({type:CreateGenotypeDiseaseReportTransDto, isArray:true})
  createGenotypeDiseaseReportTrans: CreateGenotypeDiseaseReportTransDto[]

}



