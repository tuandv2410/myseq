import { ApiProperty } from "@nestjs/swagger";
import { isArray } from "class-validator";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class DrugCategoryTransDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  language: language;
}

export class DrugCategoryDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap(()=>DrugCategoryTransDto)
  @ApiProperty({type:DrugCategoryTransDto, isArray:true })
  drugCategoryTrans: DrugCategoryTransDto[]
}


