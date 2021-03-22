import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";

export class DrugTempTransDto {

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
  advice: string;

  @AutoMap()
  @ApiProperty()
  diseaseTreatment: string;

  @AutoMap()
  @ApiProperty({required: false})
  language: language

}

export class DrugTempDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty({type:DrugTempTransDto, isArray:true})
  DrugTempTrans: DrugTempTransDto[]
}
