import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PortType } from '../../types/port';
import { IPortOptions } from '../../interfaces';
import { EmitterService } from '../emitter';
import { Port } from './port';
import * as SerialPort from 'serialport';
import Readline = SerialPort.parsers.Readline;

@Injectable()
export class SerialportService implements OnModuleInit {
  readonly ports = new Map<string, PortType>();
  readonly parser: Readline;

  constructor(
    options: IPortOptions[],
    readonly emitterService: EmitterService,
  ) {
    this.parser = new Readline({ delimiter: '\n' });

    options.forEach(option => {
      const port = new Port(option.path, {
        baudRate: 9600,
        autoReconnect: true,
      });
      this.ports.set(option.name, {
        ...option,
        port,
      });
      port.on('data', (data) => console.log('DATA', data));
      port.pipe(this.parser);
    });
  }

  onModuleInit(): any {
    // const emitDisconnected = (e: string, path: string, name: string) => {
    //   this.emitterService.emit('port_disconnected', { message: e, path, name });
    // };
    //
    // const emitConnected = (path: string, name: string) => {
    //   this.emitterService.emit('port_connected', { path, name });
    // };

    // this.parser.on('data', data => {
    //   console.log('MSG', data);
    //   this.emitterService.emit(data);
    // });
    // this.ports.forEach(({ port, path, name }) => {
    //   port.on('open', () => emitConnected(path, name));
    //   port.on('close', () => emitDisconnected('DISCONNECTED', path, name));
    //   port.on('disconnected', (e) => emitDisconnected(e, path, name));
    // });
  }

  // onModuleDestroy(): any {
  //   this.ports.forEach(({ port }) => port.disconnect());
  // }

  write(command: string) {
    let existingPort: Port;

    this.ports.forEach(({ actions, port }: PortType) => {
      const actionIndex = actions.findIndex(({ cmd }) => command === cmd);
      if (actionIndex !== -1) {
        existingPort = port;
      }
    });

    if (!existingPort) {
      return Promise.resolve();
    }

    return existingPort.writeCmd(command);
  }

  globalWrite(command: string) {
    return Promise.all(
      this.portValuesToArray().map(({ port }) => port.writeCmd(command)),
    );
  }

  portValuesToArray(): PortType[] {
    const ports = [];
    this.ports.forEach(value => ports.push(value));
    return ports;
  }
}
