import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialportService } from '../infrastructure/serialport';
import { Room2EventEmitter } from './room2.events';
import { ConfigService } from 'nestjs-config';

@WebSocketGateway(1081, { namespace: 'room2' })
export class Room2Gateway implements OnModuleInit {
  port: SerialportService;

  constructor(
    private readonly configService: ConfigService,
    @InjectEventEmitter() private readonly emitter: Room2EventEmitter) {
    this.port = new SerialportService(emitter, {
      port: configService.get('room2.port'),
      baudRate: 9600,
      delimiter: '\n',
    });
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('coffinIsOpened', async () => this.onCoffinIsOpened());
  }

  @SubscribeMessage('coffin.open')
  async onCoffinOpen(client: Client) {
    try {
      await this.port.write('openCoffin');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  onCoffinIsOpened() {
    this.server.emit('coffinIsOpened');
  }
}
