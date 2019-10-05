import { OnModuleInit } from '@nestjs/common';
import { PortConfigService } from '../port-config';
import { EmitterService } from '../emitter';
import { OnGatewayInit } from '@nestjs/websockets';
import { Namespace, Server } from 'socket.io';
import { SerialportService } from '../serialport';
import { Parser } from '../../enums';
import { IParserReply } from '../../interfaces';

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
      this.portValuesToArray().forEach(({ port }) => {
        port.parser.on(Parser.reply, (data) => this.handlePortMsg(data));
      });
      super.onModuleInit();
    }

    afterInit(server: Namespace): any {
      server.on('connection', (socket => {
        this.room.ports.forEach(({ actions }) => {
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
      const emitDisconnected = (e: string, path: string, name: string) => {
        this.server.emit('port_disconnected', { message: e, path, name });
      };

      const emitConnected = (path: string, name: string) => {
        this.server.emit('port_connected', { path, name });
      };
      this.ports.forEach(({ port, path, name }) => {
        port.on('open', () => emitConnected(path, name));
        port.on('close', () => emitDisconnected('DISCONNECTED', path, name));
        port.on('disconnected', (e) => emitDisconnected(e, path, name));
      });
    }

    handlePortMsg = ({ message, path }: IParserReply) => {
      console.log('REPLY ==>', message);
      this.server.emit(message, { path });
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
