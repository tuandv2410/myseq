import { ApiProperty } from "@nestjs/swagger";
import { DiseaseType } from "src/enum/disease-type.enum";
import { language } from "src/enum/language.enum";

export class CreateDiseaseTempTransDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  advice: string;

  @ApiProperty()
  dangerElement: string;

  @ApiProperty()
  symptom: string;

  @ApiProperty()
  treatment: string;

  @ApiProperty({required: false})
  type?: DiseaseType

  @ApiProperty()
  diseaseCategoryId: string;

  @ApiProperty()
  language: language;

}

export class CreateDiseaseTempDto {
  @ApiProperty({type:CreateDiseaseTempTransDto, isArray:true})
  diseaseTempTrans: CreateDiseaseTempTransDto[];

  @ApiProperty()
  diseaseCategoryId: string;
}
