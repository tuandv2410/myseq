import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateDiseaseCategoryTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty({required: false})
  name?: string;

  @ApiProperty({required: false})
  description?: string;
}

export class UpdateDiseaseCategoryDto {

  @ApiProperty({type:UpdateDiseaseCategoryTransDto, isArray: true})
  updateDiseaseCategoryTrans: UpdateDiseaseCategoryTransDto[]

}


