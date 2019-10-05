import { Port } from '../infrastructure/serialport/port';
import { IConfigPort } from '../interfaces';

export type PortWithConfig = IConfigPort & { port: Port };
