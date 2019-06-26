import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as cmd from 'node-cmd';
import * as util from 'util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getHello(): Promise<void> {
    const cmdGet = util.promisify(cmd.get);

    const data = await cmdGet('Mode COM3:9600,n,8,1,P && echo 1 > COM3');
  }
}
