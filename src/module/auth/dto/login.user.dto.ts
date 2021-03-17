import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

  @ApiProperty()
  account: string;

  @ApiProperty()
  password: string;

}
