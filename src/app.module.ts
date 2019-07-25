import { Module } from '@nestjs/common';
import * as path from 'path';
import { PortConfigModule } from './infrastructure/port-config';
import { EmitterModule } from './infrastructure/emitter';
import { Room1Module } from './room1';

@Module({
  imports: [
    EmitterModule,
    PortConfigModule.load(path.resolve(__dirname, '..', 'port.config.json')),
    Room1Module,
  ],
})
export class AppModule {}
