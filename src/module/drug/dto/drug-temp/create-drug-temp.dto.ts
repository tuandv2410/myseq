import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateDrugTempTransDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  advice: string;

  @ApiProperty()
  diseaseTreatment: string;

  @ApiProperty()
  language: language;

}

export class CreateDrugTempDto {
  @ApiProperty({type:CreateDrugTempTransDto, isArray:true})
  drugTempTrans: CreateDrugTempTransDto[];

  @ApiProperty()
  drugCategoryId: string;
}
