import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { IAction } from '../../interfaces';

@Injectable()
export class EmitterService {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(msg, data?: any) {
    this.emitter.emit(msg, data);
  }

  subscribe(actions: IAction[], callback: (msg: string) => void) {
    actions.forEach(({ socketReply }) => {
      this.emitter.on(socketReply, () => callback(socketReply));
    });
  }

  on(msg: string, callback: (data?: any) => any) {
    this.emitter.on(msg, callback);
  }
}
