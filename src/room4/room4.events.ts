import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

export interface IRoom4Events {
  safeIsOpened: string;
}

export type Room4EventEmitter = StrictEventEmitter<EventEmitter, IRoom4Events>;
