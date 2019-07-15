import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

export interface IRoom2Events {
  coffinIsOpened: string;
}

export type Room2EventEmitter = StrictEventEmitter<EventEmitter, IRoom2Events>;
