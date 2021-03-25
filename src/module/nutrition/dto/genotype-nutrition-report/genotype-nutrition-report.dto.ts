import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class GenotypeNutritionReportTransDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  geneSeq: string;

  @AutoMap()
  @ApiProperty()
  language: language;

  @AutoMap()
  @ApiProperty()
  phenotype: string;

}

export class GenotypeNutritionReportDto {
  @AutoMap()
  @ApiProperty()
  id: string;


  @AutoMap()
  @ApiProperty()
  level: number;

  @AutoMap()
  @ApiProperty({type: GenotypeNutritionReportTransDto, isArray:true})
  genotypeNutritionReportTrans: GenotypeNutritionReportTransDto[];

}
