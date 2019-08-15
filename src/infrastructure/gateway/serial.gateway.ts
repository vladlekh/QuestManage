import { OnModuleInit } from '@nestjs/common';
import { PortConfigService } from '../port-config';
import { EmitterService } from '../emitter';
import { OnGatewayInit } from '@nestjs/websockets';
import { Client, Namespace, Server } from 'socket.io';
import { SerialportService } from '../serialport';

export function SerialGateway(roomName) {
  return class Gateway extends SerialportService implements OnGatewayInit, OnModuleInit {
    readonly room;

    constructor(
      readonly portConfigService: PortConfigService,
      readonly emitterService: EmitterService,
    ) {
      super(portConfigService.get(roomName).ports, emitterService);
      this.room = portConfigService.get(roomName);
    }

    server: Server;

    onModuleInit(): any {
      const ports = this.room.ports;
      ports.forEach(({ actions }) => {
        this.emitterService.subscribe(actions, this.onPortMsg);
      });
      this.emitterService.on('port_disconnected', (data) => this.server.emit('port_disconnected', data));
      this.emitterService.on('port_connected', (data) => this.server.emit('port_connected', data));
      this.emitterService.on('light', () => this.onPortMsg('light'));
      super.onModuleInit();
    }

    afterInit(server: Namespace): any {
      server.on('connection', (socket => {
        const ports = this.room.ports;
        ports.forEach(({ actions }) => {
          actions.forEach(({ socketEvent, cmd }) => {
            socket.on(socketEvent, () => this.write(cmd));
          });
        });
        socket.on('set.persons', this.handleSetPersons);
        socket.on('reset', this.handleReset);
      }));
    }

    onPortMsg = (msg: string) => {
      this.server.emit(msg);
    };

    handleSetPersons = async (persons: number) => {
      console.log('SET PERSONS', persons);
      await this.globalWrite(`setPersons=${persons}`);
    };

    handleReset = async () => {
      console.log('RESET');
      await this.globalWrite('reset');
    }
  };
}
