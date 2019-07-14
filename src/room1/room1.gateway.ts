import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectEventEmitter } from 'nest-emitter';
import { SerialportService } from '../infrastructure/serialport';
import { Room1EventEmitter } from './room1.events';

@WebSocketGateway(1081, { namespace: 'room1' })
export class Room1Gateway implements OnModuleInit {
  constructor(
    private readonly serialPortService: SerialportService,
    @InjectEventEmitter() private readonly emitter: Room1EventEmitter) {
  }

  @WebSocketServer()
  server;

  onModuleInit(): any {
    this.emitter.on('boxIsOpened', async () => this.onBoxIsOpened());
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
