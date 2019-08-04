import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Namespace, Server } from 'socket.io';
import { SerialportService } from '../infrastructure/serialport';
import { PortConfigService } from '../infrastructure/port-config';
import { IPortOptions } from '../interfaces';
import { EmitterService } from '../infrastructure/emitter';

@WebSocketGateway(1081, { namespace: 'room2' })
export class Room2Gateway extends SerialportService implements OnGatewayInit, OnModuleInit {
  constructor(
    private readonly portConfigService: PortConfigService,
    emitterService: EmitterService,
  ) {
    super(portConfigService.get('room2').ports, emitterService);
  }

  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    const ports = this.portConfigService.get('room2').ports as IPortOptions[];
    ports.forEach(({ actions }) => {
      this.emitterService.subscribe(actions, this.onPortMsg);
    });
    super.onModuleInit();
  }

  afterInit(server: Namespace): any {
    server.on('connection', (socket => {
      const ports = this.portConfigService.get('room2').ports as IPortOptions[];
      ports.forEach(({ actions }) => {
        actions.forEach(({ socketEvent, cmd }) => {
          socket.on(socketEvent, () => this.write(cmd));
        });
      });
    }));
  }

  onPortMsg = (msg: string) => {
    this.server.emit(msg);
  }
}
