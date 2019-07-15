import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialportService } from '../infrastructure/serialport';
import { Room4EventEmitter } from './room4.events';
import { ConfigService } from 'nestjs-config';

@WebSocketGateway(1081, { namespace: 'room4' })
export class Room4Gateway implements OnModuleInit {
  port: SerialportService;

  constructor(
    private readonly configService: ConfigService,
    @InjectEventEmitter() private readonly emitter: Room4EventEmitter) {
    this.port = new SerialportService(emitter, {
      port: configService.get('room4.port'),
      baudRate: 9600,
      delimiter: '\n',
    });
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('safeIsOpened', async () => this.onCoffinIsOpened());
  }

  @SubscribeMessage('safe.open')
  async onCoffinOpen(client: Client) {
    try {
      await this.port.write('openSafe');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  onCoffinIsOpened() {
    this.server.emit('safeIsOpened');
  }
}
