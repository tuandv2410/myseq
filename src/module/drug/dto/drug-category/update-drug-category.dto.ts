import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateDrugCategoryTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty({required: false})
  name?: string;

  @ApiProperty({required: false})
  description?: string;
}

export class UpdateDrugCategoryDto {

  @ApiProperty({type:UpdateDrugCategoryTransDto, isArray: true})
  updateDrugCategoryTrans: UpdateDrugCategoryTransDto[]

}


