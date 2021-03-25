import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class GenotypeNutritionTempTransDto {

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

export class GenotypeNutritionTempDto {

  @AutoMap()
  @ApiProperty()
  id: string;


  @AutoMap()
  @ApiProperty()
  level: number;

  @AutoMap()
  @ApiProperty({type: GenotypeNutritionTempTransDto, isArray:true})
  genotypeNutritionReportTrans: GenotypeNutritionTempTransDto[];

}
