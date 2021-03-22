import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { gender } from "src/enum/gender.enum";
import { role } from "src/enum/role.enum";

export class UserDto {

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  birthday: string;

  @AutoMap()
  @ApiProperty()
  gender: gender;

  @AutoMap()
  @ApiProperty()
  role : role;

  @AutoMap()
  @ApiProperty()
  account: string;

}
