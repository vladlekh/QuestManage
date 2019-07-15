import { Module } from '@nestjs/common';
import { SerialportModule } from '../infrastructure/serialport';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { EventEmitter } from 'events';
import * as path from 'path';
import { Room3Gateway } from './room3.gateway';

@Module({
  imports: [
    // SerialportModule.fotRootAsync({
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       port: '/dev/ttyUSB0',
    //       baudRate: 9600,
    //       delimiter: '\n',
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  providers: [Room3Gateway],
})
export class Room3Module {

}
