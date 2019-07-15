import { Module } from '@nestjs/common';
import { SerialportModule } from '../infrastructure/serialport';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { EventEmitter } from 'events';
import * as path from 'path';
import { Room1Gateway } from './room1.gateway';

@Module({
  imports: [
    // SerialportModule.fotRootAsync({
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       port: configService.get('room1.port'),
    //       baudRate: 9600,
    //       delimiter: '\n',
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  providers: [Room1Gateway],
})
export class Room1Module {

}
