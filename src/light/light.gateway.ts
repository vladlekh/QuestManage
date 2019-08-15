import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Port } from '../infrastructure/serialport/port';
import * as SerialPort from 'serialport';
import Readline = SerialPort.parsers.Readline;

@WebSocketGateway(1081, { namespace: 'light' })
export class LightGateway {
  port: Port;
  parser: Readline;

  @WebSocketServer()
  server: Server;

  constructor() {
    this.parser = new Readline({ delimiter: '\n' });
    this.port = new Port('/dev/ttyUSB0', {
      baudRate: 9600,
      autoReconnect: true,
    });
    this.port.pipe(this.parser);
  }

  @SubscribeMessage('turn.light')
  async handleTurnLight() {
    console.log('TURN LIGHT');
    await this.port.writeCmd('startQuest');
  }

  @SubscribeMessage('switch.light')
  async handleSwitchLight() {
    console.log('SWITCH LIGHT');
    await this.port.writeCmd('switchLight');
  }

  @SubscribeMessage('reset')
  async handleResetLight() {
    console.log('RESET LIGHT');
    await this.port.writeCmd('reset');
  }
}
