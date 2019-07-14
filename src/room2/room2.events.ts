import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

export interface IRoom2Events {
  cfOpened: string;
};

export type Room2EventEmitter = StrictEventEmitter<EventEmitter, IRoom2Events>;
