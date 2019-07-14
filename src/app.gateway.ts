import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialPortEventEmitter } from './infrastructure/serialport/serialport.event';
import { SerialportService } from './infrastructure/serialport/serialport.service';

@WebSocketGateway(1081, { namespace: 'room1' })
export class AppGateway implements OnModuleInit {
  constructor(
    private readonly serialPortService: SerialportService,
    @InjectEventEmitter() private readonly emitter: SerialPortEventEmitter) {
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('boxIsOpened', async () => this.onBoxIsOpened());
    this.emitter.on('lightOn', async () => this.onLightOn());
  }

  @SubscribeMessage('reset')
  async onReset(client: Client) {
    try {
      await this.serialPortService.write('reset');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @SubscribeMessage('box.open')
  async onBoxOpen(client: Client) {
    try {
      await this.serialPortService.write('openBox');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @SubscribeMessage('light.switch')
  async onLightSwitch(client: Client) {
    try {
      await this.serialPortService.write('switchLight');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  onBoxIsOpened() {
    this.server.emit('boxIsOpened');
  }

  onLightOn() {
    this.server.emit('lightOn');
  }
}
