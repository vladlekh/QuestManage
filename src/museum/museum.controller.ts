import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginUserDto } from '../dto';
import { Room2Gateway } from '../room2/room2.gateway';

@Controller('museum')
export class MuseumController {
  private userLogin = 'admin';
  private userPassword = 'qwerty';

  constructor(private room2Gateway: Room2Gateway) {
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res() res): void {
    loginUserDto.login === this.userLogin && loginUserDto.password === this.userPassword
      ? res.sendStatus(200)
      : res.sendStatus(403);
  }

  @Post('signaling')
  async signaling(@Res() res): Promise<void> {
    await this.room2Gateway.write('signaling');
    res.sendStatus(200);
  }

  @Post('stand')
  async stand(@Res() res): Promise<void> {
    await this.room2Gateway.write('stopSignaling');
    await this.room2Gateway.write('openStand');
    res.sendStatus(200);
  }
}
