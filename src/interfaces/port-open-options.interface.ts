import * as SerialPort from 'serialport';

export interface IPortOpenOptions extends SerialPort.OpenOptions {
  autoReconnect?: boolean;
}
