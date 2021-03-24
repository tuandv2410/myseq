import { ApiProperty } from "@nestjs/swagger";
import { gender } from "src/enum/gender.enum";
import { role } from "src/enum/role.enum";
import { language } from "../../../enum/language.enum";

export class CreateUserDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  gender: gender;

  @ApiProperty()
  role : role;
  
  @ApiProperty()
  account: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  language: language;

}
