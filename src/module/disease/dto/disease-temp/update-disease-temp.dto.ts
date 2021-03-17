import { ApiProperty } from "@nestjs/swagger";
import { DiseaseType } from "src/enum/disease-type.enum";
import { language } from "src/enum/language.enum";

export class UpdateDiseaseTempTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty({required: false})
  description?: string;

  @ApiProperty({required: false})
  advice?: string;

  @ApiProperty({required: false})
  dangerElement?: string;

  @ApiProperty({required: false})
  symptom?: string;

  @ApiProperty({required: false})
  treatment?: string;

  @ApiProperty({required: false})
  type?: DiseaseType;
}

export class UpdateDiseaseTempDto {

  @ApiProperty({type: UpdateDiseaseTempTransDto, isArray:true, required: false})
  updateDiseaseTempTrans?: UpdateDiseaseTempTransDto[]

  @ApiProperty({required: false})
  diseaseCategoryId?: string;
}
