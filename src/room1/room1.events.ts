import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

export interface IRoom1Events {
  boxIsOpened: string;
};

export type Room1EventEmitter = StrictEventEmitter<EventEmitter, IRoom1Events>;
