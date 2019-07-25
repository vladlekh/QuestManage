import { Injectable, OnModuleInit } from '@nestjs/common';
import * as SerialPort from 'serialport';
import { Port } from '../../types/port';
import { IPortOptions } from '../../interfaces';
import { EmitterService } from '../emitter';
import Readline = SerialPort.parsers.Readline;

@Injectable()
export class SerialportService implements OnModuleInit {
  readonly ports = new Map<string, Port>();
  private readonly parser: Readline;

  constructor(
    options: IPortOptions[],
    protected readonly emitterService: EmitterService,
  ) {
    this.parser = new Readline({ delimiter: '\n' });
    options.forEach(option => {
      const port = new SerialPort(option.path, {
        baudRate: 9600,
      });
      this.ports.set(option.name, {
        ...option,
        port,
      });
      port.pipe(this.parser);
    });
  }

  onModuleInit(): any {
    this.parser.on('data', data => {
      console.log(data);
      this.emitterService.emit(data);
    });
  }

  write(message: string) {
    let existingPort: SerialPort;
    let cmd: string;

    this.ports.forEach(({ actions, port }) => {
      if (actions[message]) {
        existingPort = port;
        cmd = actions[message];
      }
    });

    if (!existingPort) {
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      existingPort.write(Buffer.from(cmd), (err, length) => {
        if (!err) {
          return resolve(length);
        }
        reject(err);
      });
    });
  }
}
