import { IPortOptions } from '../interfaces/port-options.interface';
import { Port } from '../infrastructure/serialport/port';

export type PortType = IPortOptions & { port: Port};
