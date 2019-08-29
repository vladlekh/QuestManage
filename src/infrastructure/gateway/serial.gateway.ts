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
      this.parser.on('data', data => {
        console.log('REPLY ==>', data);
        this.handlePortMsg(data);
      });
      super.onModuleInit();
    }

    afterInit(server: Namespace): any {
      server.on('connection', (socket => {
        const ports = this.room.ports;
        ports.forEach(({ actions }) => {
          actions.forEach(({ socketEvent, cmd }) => {
            socket.on(socketEvent, async () => {
              console.log('CMD ==>', cmd);
              this.write(cmd);
            });
          });
        });
        socket.on('set.persons', this.handleSetPersons);
        socket.on('reset', this.handleReset);
      }));
    }

    handlePortMsg = (msg: string) => {
      this.server.emit(msg);
    };

    handleSetPersons = async (persons: number) => {
      console.log('SET PERSONS ==>', persons);
      await this.globalWrite(`setPersons=${persons}`);
    };

    handleReset = async () => {
      console.log('RESET');
      await this.globalWrite('reset');
    }
  };
}
