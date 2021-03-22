import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseType } from "src/enum/disease-type.enum";
import { language } from "src/enum/language.enum";


export class DiseaseTempTransDto {

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
  dangerElement: string;

  @AutoMap()
  @ApiProperty()
  symptom: string;

  @AutoMap()
  @ApiProperty()
  treatment: string;

  @AutoMap()
  @ApiProperty({required: false})
  type?: DiseaseType

  @AutoMap()
  @ApiProperty({required: false})
  language: language

}

export class DiseaseTempDto {

  @AutoMap()
  @ApiProperty()
  id: string;
  @AutoMap()
  @ApiProperty({type:DiseaseTempTransDto, isArray:true})
  DiseaseTempTrans: DiseaseTempTransDto[]
}
