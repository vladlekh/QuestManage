import { Controller, Get } from '@nestjs/common';
import { PortConfigService } from './infrastructure/port-config';

@Controller()
export class AppController {
  constructor(private readonly portConfigService: PortConfigService) {
  }

  @Get('config')
  getConfig() {
    return this.portConfigService.get();
  }
}
