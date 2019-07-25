import { IPortOptions } from '../interfaces/port-options.interface';
import * as SerialPort from 'serialport';

export type Port = IPortOptions & { port: SerialPort};
