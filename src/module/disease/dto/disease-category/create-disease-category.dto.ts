import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { language } from "src/enum/language.enum";

export class CreateDiseaseCategoryTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  description?: string;
}

export class CreateDiseaseCategoryDto {
  @ApiProperty({type:CreateDiseaseCategoryTransDto, isArray:true })
  diseaseCategoryTrans: CreateDiseaseCategoryTransDto[];
}


