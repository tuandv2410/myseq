import { ApiProperty } from "@nestjs/swagger";
import { language } from "src/enum/language.enum";

export class CreateDrugCategoryTransDto {
  @ApiProperty()
  language: language;

  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  description?: string;
}

export class CreateDrugCategoryDto {
  @ApiProperty({type:CreateDrugCategoryTransDto, isArray:true })
  drugCategoryTrans: CreateDrugCategoryTransDto[];
}


