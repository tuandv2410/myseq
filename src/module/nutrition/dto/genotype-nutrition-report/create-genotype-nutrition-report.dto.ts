import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateGenotypeNutritionReportTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  geneSeq: string;

  @ApiProperty()
  phenotype: string;

}
export class CreateGenotypeNutritionReportDto {
  @ApiProperty()
  level: number;

  @ApiProperty({type:CreateGenotypeNutritionReportTransDto, isArray:true})
  createGenotypeNutritionReportTrans: CreateGenotypeNutritionReportTransDto[]

}



