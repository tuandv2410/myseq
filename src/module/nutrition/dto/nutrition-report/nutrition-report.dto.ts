import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";
export class NutritionReportTransDto {

  @AutoMap()
  @ApiProperty()
  id: string;
  
  @AutoMap()
  @ApiProperty()
  language: language;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty({required: false})
  draftConclusion?: string;

  @AutoMap()
  @ApiProperty({required: false})
  finalConclusion?: string;
}

export class NutritionReportDto {

  @AutoMap()
  @ApiProperty()
  id: string;
  
  @AutoMap()
  @ApiProperty({type: NutritionReportTransDto, isArray:true})
  nutritionReportTrans: NutritionReportTransDto[]
}

