import { ApiProperty } from "@nestjs/swagger";
import { gender } from "src/enum/gender.enum";
import { role } from "src/enum/role.enum";

export class FilterUserDto {

  @ApiProperty({required:false})
  id?: string;

  @ApiProperty({required:false})
  name?: string;

  @ApiProperty({required:false})
  birthday?: string;

  @ApiProperty({required:false})
  gender?: gender;

  @ApiProperty({required:false})
  role?: role;

  @ApiProperty({required:false})
  account?: string;

}
