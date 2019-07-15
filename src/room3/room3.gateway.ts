import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialportService } from '../infrastructure/serialport';
import { Room3EventEmitter } from './room3.events';
import { ConfigService } from 'nestjs-config';

@WebSocketGateway(1081, { namespace: 'room3' })
export class Room3Gateway implements OnModuleInit {
  port: SerialportService;

  constructor(
    private readonly configService: ConfigService,
    @InjectEventEmitter() private readonly emitter: Room3EventEmitter) {
    this.port = new SerialportService(emitter, {
      port: configService.get('room3.port'),
      baudRate: 9600,
      delimiter: '\n',
    });
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('lightOn', async () => this.onCoffinIsOpened());
  }

  @SubscribeMessage('light.switch')
  async onCoffinOpen(client: Client) {
    try {
      await this.port.write('switchLight');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  onCoffinIsOpened() {
    this.server.emit('lightOn');
  }
}
