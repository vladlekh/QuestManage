import { IConfigPort } from './config-port.interface';

export interface IConfig {
  [key: string]: {
    ports: IConfigPort[],
    name: string;
    socketNamespace: string;
    displayName: string;
  };
}
