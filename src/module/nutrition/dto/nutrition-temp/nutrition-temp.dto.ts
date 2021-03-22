import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { language } from "src/enum/language.enum";


export class NutritionTempTransDto {

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
  @ApiProperty({required: false})
  language: language

}

export class NutritionTempDto {

  @AutoMap()
  @ApiProperty()
  id: string;
  @AutoMap()
  @ApiProperty({type:NutritionTempTransDto, isArray:true})
  NutritionTempTrans: NutritionTempTransDto[]
}
