import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";
export class DrugReportTransDto {

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

export class DrugReportDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  new: boolean;

  @AutoMap()
  @ApiProperty()
  approve: boolean;
  
  @AutoMap()
  @ApiProperty({type: DrugReportTransDto, isArray:true})
  drugReportTrans: DrugReportTransDto[]
}

