import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginUserDto } from '../dto';
import { Room2Gateway } from '../room2/room2.gateway';
import { LoggerService } from '../infrastructure/logger/logger.service';

@Controller('museum')
export class MuseumController {
  private userLogin = 'Сеныч';
  private userPassword = '070895';

  constructor(private room2Gateway: Room2Gateway, private loggerService: LoggerService) {
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res() res): void {
    console.log('MUSEUM LOGIN', loginUserDto.login);
    console.log('MUSEUM PASSWORD', loginUserDto.password);
    this.loggerService.logMuseumData(loginUserDto);
    loginUserDto.login.trim() === this.userLogin && loginUserDto.password .trim() === this.userPassword
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
    // await this.room2Gateway.write('openStand');
    setTimeout(async () => await this.room2Gateway.write('stopSignaling'), 2000);
    res.sendStatus(200);
  }
}
