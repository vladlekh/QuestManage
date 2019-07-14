import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialportService } from '../infrastructure/serialport';
import { Room2EventEmitter } from './room2.events';

@WebSocketGateway(1081, { namespace: 'room2' })
export class Room2Gateway implements OnModuleInit {
  port: SerialportService;

  constructor(
    private readonly serialPortService: SerialportService,
    @InjectEventEmitter() private readonly emitter: Room2EventEmitter) {
    this.port = new SerialportService(emitter, {
      port: '/dev/ttyUSB0',
      baudRate: 9600,
      delimiter: '',
    });
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('cfOpened', async () => this.onCoffinIsOpened());
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
    this.server.emit('cfOpened');
  }
}
