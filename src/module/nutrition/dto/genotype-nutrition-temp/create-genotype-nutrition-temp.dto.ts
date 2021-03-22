import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateGenotypeNutritionTempTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  geneSeq: string;

  @ApiProperty()
  phenotype: string;

}
export class CreateGenotypeNutritionTempDto {
  @ApiProperty()
  level: number;

  @ApiProperty({type:CreateGenotypeNutritionTempTransDto, isArray:true})
  createGenotypeNutritionReportTrans: CreateGenotypeNutritionTempTransDto[]

}



