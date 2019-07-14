import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

export interface ISerialPortEvent {
  boxIsOpened: string;
  lightOn: string;
}

export type SerialPortEventEmitter = StrictEventEmitter<EventEmitter, ISerialPortEvent>;
