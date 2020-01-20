import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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
    this.port = new Port('/dev/ttyUSB11', {
      baudRate: 9600,
      autoReconnect: true,
    });
    this.port.pipe(this.parser);
  }

  @SubscribeMessage('turn.light')
  async handleTurnLight(client: Socket, data: string) {
    if (data === 'ON') {
      await this.port.writeCmd('turnLightOn');
    } else if (data === 'OFF') {
      await this.port.writeCmd('turnLightOff');
    }
  }

  @SubscribeMessage('start.light')
  async handleStartLight() {
    await this.port.writeCmd('turnLight');
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
