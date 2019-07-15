import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitter } from 'events';
import { NestEmitterModule } from 'nest-emitter';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { SerialportModule, SerialportService } from './infrastructure/serialport';
import { Room1Module } from './room1/room1.module';
import { Room2Module } from './room2/room2.module';
import { Room3Module } from './room3/room3.module';
import { Room4Module } from './room4/room4.module';

@Module({
  imports: [
    NestEmitterModule.forRoot(new EventEmitter()),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    Room1Module,
    Room2Module,
    Room3Module,
    Room4Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
