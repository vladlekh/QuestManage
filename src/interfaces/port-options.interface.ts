import { IAction } from './action.interface';

export interface IPortOptions {
  path: string;
  name: string;
  socketNamespace: string;
  actions: IAction[];
  replies: [];
}
