import { ApiProperty } from "@nestjs/swagger";
import { isArray } from "class-validator";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class DiseaseCategoryTransDto {

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

export class DiseaseCategoryDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap(()=>DiseaseCategoryTransDto)
  @ApiProperty({type:DiseaseCategoryTransDto, isArray:true })
  diseaseCategoryTrans: DiseaseCategoryTransDto[]
}


