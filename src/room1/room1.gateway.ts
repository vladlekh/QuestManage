import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Namespace, Server } from 'socket.io';
import { SerialportService } from '../infrastructure/serialport';
import { PortConfigService } from '../infrastructure/port-config';
import { IPortOptions } from '../interfaces';
import { EmitterService } from '../infrastructure/emitter';

@WebSocketGateway(1081, { namespace: 'room1' })
export class Room1Gateway extends SerialportService implements OnGatewayInit, OnModuleInit {
  constructor(
    private readonly portConfigService: PortConfigService,
    emitterService: EmitterService,
  ) {
    super(portConfigService.get('room1').ports, emitterService);
  }

  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    const ports = this.portConfigService.get('room1').ports as IPortOptions[];
    ports.forEach(({ replies }) => {
      this.emitterService.subscribe(replies, this.onPortMsg);
    });
    super.onModuleInit();
  }

  afterInit(server: Namespace): any {
    server.on('connection', (socket => {
      const ports = this.portConfigService.get('room1').ports as IPortOptions[];
      ports.forEach(({ actions }) => {
        Object.keys(actions).forEach(key => {
          socket.on(key, () => this.write(key));
        });
      });
    }));
  }

  onPortMsg = (msg: string) => {
    this.server.emit(msg);
  }
}
