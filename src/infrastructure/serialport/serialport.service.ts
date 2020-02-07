import { Injectable } from '@nestjs/common';
import { PortWithConfig } from '../../types/port-with-config';
import { IConfigPort } from '../../interfaces';
import { EmitterService } from '../emitter';
import { Port } from './port';

@Injectable()
export class SerialportService {
  readonly ports = new Map<string, PortWithConfig>();

  constructor(
    options: IConfigPort[],
    readonly emitterService: EmitterService,
  ) {
    options.forEach(option => {
      const port = new Port(option.path, {
        baudRate: 9600,
        autoReconnect: true,
      });
      this.ports.set(option.name, {
        ...option,
        port,
      });
    });
  }

  write(command: string) {
    let existingPort: Port;

    this.ports.forEach(({ actions, port }: PortWithConfig) => {
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

  portValuesToArray(): PortWithConfig[] {
    const ports = [];
    this.ports.forEach(value => ports.push(value));
    return ports;
  }
}
