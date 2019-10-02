import { Module } from '@nestjs/common';
import * as path from 'path';
import { PortConfigModule } from './infrastructure/port-config';
import { EmitterModule } from './infrastructure/emitter';
import { AppController } from './app.controller';
import { Room1Module } from './room1';
import { Room2Module } from './room2';
import { LightModule } from './light';
import { Room3Module } from './room3';

@Module({
  imports: [
    EmitterModule,
    PortConfigModule.load(path.resolve(__dirname, '..', 'port.config.json')),
    Room1Module,
    Room2Module,
    // Room3Module,
    LightModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
