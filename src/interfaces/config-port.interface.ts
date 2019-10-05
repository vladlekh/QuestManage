import { IConfigAction } from './config-action.interface';

export interface IConfigPort {
  path: string;
  name: string;
  actions: IConfigAction[];
}
