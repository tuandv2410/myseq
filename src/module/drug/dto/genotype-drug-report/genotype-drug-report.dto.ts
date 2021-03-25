import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class GenotypeDrugReportTransDto {

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

export class GenotypeDrugReportDto {
  @AutoMap()
  @ApiProperty()
  id: string;


  @AutoMap()
  @ApiProperty()
  level: number;

  @AutoMap()
  @ApiProperty({type: GenotypeDrugReportTransDto, isArray:true})
  genotypeDrugReportTrans: GenotypeDrugReportTransDto[];

}
