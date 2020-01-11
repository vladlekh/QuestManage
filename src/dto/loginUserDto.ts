import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty()
  readonly login: string;

  @ApiModelProperty()
  readonly password: string;
}