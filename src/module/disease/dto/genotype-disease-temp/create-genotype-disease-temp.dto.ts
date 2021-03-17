import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateGenotypeDiseaseTempTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  geneSeq: string;

  @ApiProperty()
  phenotype: string;

}
export class CreateGenotypeDiseaseTempDto {
  @ApiProperty()
  level: number;

  @ApiProperty({type:CreateGenotypeDiseaseTempTransDto, isArray:true})
  createGenotypeDiseaseReportTrans: CreateGenotypeDiseaseTempTransDto[]

}



