import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Port } from '../infrastructure/serialport/port';
import * as SerialPort from 'serialport';
import Readline = SerialPort.parsers.Readline;

@WebSocketGateway(1081, { namespace: 'light' })
export class LightGateway {
  port220: Port;
  portLed: Port;
  parser: Readline;

  @WebSocketServer()
  server: Server;

  constructor() {
    this.parser = new Readline({ delimiter: '\n' });
    this.port220 = new Port('COM13', {
      baudRate: 9600,
      autoReconnect: true,
    });
    this.portLed = new Port('COM4', {
      baudRate: 9600,
      autoReconnect: true,
    });
    this.port220.pipe(this.parser);
    this.portLed.pipe(this.parser);
  }

  @SubscribeMessage('turn.light')
  async handleTurnLight(socket: Socket, data: string) {
    if (data === 'ON') {
      await this.port220.writeCmd('dlon');
      await this.portLed.writeCmd('turnLightOn');

    } else if (data === 'OFF') {
      await this.port220.writeCmd('dlof');
      await this.portLed.writeCmd('turnLightOff');
    }
    // await this.port220.writeCmd('startQuest');
    // await this.portLed.writeCmd('startQuest');
  }

  @SubscribeMessage('start.light')
  async handleStartDimLight() {
    console.log('START DIMMING');
    await this.port220.writeCmd('startQuest');
    await this.portLed.writeCmd('startQuest');
  }

  @SubscribeMessage('switch.light')
  async handleSwitchLight() {
    await this.port220.writeCmd('sl');
    await this.portLed.writeCmd('switchLight');
  }

  @SubscribeMessage('reset')
  async handleResetLight() {
    await this.port220.writeCmd('rst');
    await this.portLed.writeCmd('reset');
  }
}
