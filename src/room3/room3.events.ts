import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

export interface IRoom3Events {
  lightOn: string;
}

export type Room3EventEmitter = StrictEventEmitter<EventEmitter, IRoom3Events>;
