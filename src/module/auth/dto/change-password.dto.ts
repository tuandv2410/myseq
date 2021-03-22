import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  newPassword: string;

}
