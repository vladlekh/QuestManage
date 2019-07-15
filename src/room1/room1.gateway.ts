import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialportService } from '../infrastructure/serialport';
import { Room1EventEmitter } from './room1.events';
import { ConfigService } from 'nestjs-config';

@WebSocketGateway(1081, { namespace: 'room1' })
export class Room1Gateway implements OnModuleInit {
  port: SerialportService;

  constructor(
    private readonly configService: ConfigService,
    @InjectEventEmitter() private readonly emitter: Room1EventEmitter) {
    this.port = new SerialportService(emitter, {
      port: configService.get('room1.port'),
      baudRate: 9600,
      delimiter: '\n',
    });
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('boxIsOpened', async () => this.onBoxIsOpened());
  }

  @SubscribeMessage('reset')
  async onReset(client: Client) {
    try {
      await this.port.write('reset');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @SubscribeMessage('box.open')
  async onBoxOpen(client: Client) {
    try {
      await this.port.write('openBox');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  onBoxIsOpened() {
    this.server.emit('boxIsOpened');
  }
}
