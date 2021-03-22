import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class UpdateDrugTempTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty({required: false})
  description?: string;

  @ApiProperty({required: false})
  advice?: string;

  @ApiProperty({required: false})
  diseaseTreatment?: string;

}

export class UpdateDrugTempDto {

  @ApiProperty({type: UpdateDrugTempTransDto, isArray:true, required: false})
  updateDrugTempTrans?: UpdateDrugTempTransDto[]

  @ApiProperty({required: false})
  drugCategoryId?: string;
}
