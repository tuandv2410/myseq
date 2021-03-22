import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateDrugReportTransDto {
  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  draftConclusion?: string;

  @ApiProperty({required: false})
  finalConclusion?: string;

  @ApiProperty()
  language: language;
}

export class CreateDrugReportDto {

  @ApiProperty()
  drugTempId: string;

  @ApiProperty({type:CreateDrugReportTransDto, isArray: true})
  drugReportTrans: CreateDrugReportTransDto[]

}

