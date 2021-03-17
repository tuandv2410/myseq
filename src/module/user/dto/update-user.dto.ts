import { ApiProperty } from "@nestjs/swagger";
import { gender } from "src/enum/gender.enum";

export class UpdateUserDto {

  @ApiProperty({required: false})
  name?: string;

  @ApiProperty({required: false})
  birthday?: string;

  @ApiProperty({required: false})
  gender?: gender;

}
