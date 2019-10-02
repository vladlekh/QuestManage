import { Controller, Get } from '@nestjs/common';
import { PortConfigService } from './infrastructure/port-config';
import { IPort } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly portConfigService: PortConfigService) {
  }

  @Get('config')
  getConfig() {
    return this.portConfigService.get();
  }

  @Get('ports')
  getPortsList(): IPort[] {
    return this.portConfigService.getPortsList();
  }
} 
