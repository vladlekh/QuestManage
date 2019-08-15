import { IPortOptions } from './port-options.interface';

export interface IRoom {
  socketNameSpace: string;
  displayName: string;
  name: string;
  ports: IPortOptions[];
}
