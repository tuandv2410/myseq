import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateDiseaseReportTransDto {
  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  draftConclusion?: string;

  @ApiProperty({required: false})
  finalConclusion?: string;

  @ApiProperty()
  language: language;
}

export class CreateDiseaseReportDto {

  @ApiProperty()
  diseaseTempId: string;

  @ApiProperty({type:CreateDiseaseReportTransDto, isArray: true})
  diseaseReportTrans: CreateDiseaseReportTransDto[]

}

