import { Injectable, OnModuleInit, Optional } from '@nestjs/common';
import * as SerialPort from 'serialport';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialPortEventEmitter } from './serialport.event';
import Readline = SerialPort.parsers.Readline;
import { ISerialPortOptions } from './interfaces';
import { EventEmitter } from 'events';

// @Injectable()
export class SerialportService implements OnModuleInit {
  private readonly port: SerialPort;
  private readonly parser: Readline;

  constructor(
    @InjectEventEmitter() private readonly emitter: EventEmitter,
    options: ISerialPortOptions,
  ) {
    this.port = new SerialPort(options.port, {
      baudRate: options.baudRate,
    });
    this.parser = new Readline({ delimiter: options.delimiter });
    this.port.pipe(this.parser);
    this.parser.on('data', msg => {
      console.log(msg);
      this.emitter.emit(msg);
    });
  }

  onModuleInit(): any {

    this.port.on('data', data => console.log(data));
  }

  write(message: string) {
    return new Promise((resolve, reject) => {
      this.port.write(Buffer.from(message), (err, length) => {
        if (!err) {
          return resolve(length);
        }
        reject(err);
      });
    });
  }
}
