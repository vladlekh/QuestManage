import { Module } from '@nestjs/common';
import * as path from 'path';
import { PortConfigModule } from './infrastructure/port-config';
import { EmitterModule } from './infrastructure/emitter';
import { AppController } from './app.controller';
import { Room1Module } from './room1';
import { Room2Module } from './room2';
import { LightModule } from './light';
import { Room5Module } from './room5';
import { Room3Module } from './room3';
import { Room4Module } from './room4';
import { MuseumModule } from './museum';
import { SoundModule } from './sound';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { AdminModule } from './admin';

@Module({
  imports: [
    EmitterModule,
    PortConfigModule.load(path.resolve(__dirname, '..', 'port.config.vlad.json')),
    Room1Module,
    Room2Module,
    Room3Module,
    Room4Module,
    Room5Module,
    // LightModule,
    MuseumModule,
    SoundModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
