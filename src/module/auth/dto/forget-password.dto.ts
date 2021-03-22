import { ApiProperty } from "@nestjs/swagger";

export class ForgetPasswordDto {
  @ApiProperty()
  account: string;

  @ApiProperty({required: false})
  token?: string;

}
