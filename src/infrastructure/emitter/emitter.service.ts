import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { IAction } from '../../interfaces';

@Injectable()
export class EmitterService {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(msg) {
    this.emitter.emit(msg);
  }

  subscribe(actions: IAction[], callback: (msg: string) => void) {
    actions.forEach(({ socketReply }) => {
      this.emitter.on(socketReply, () => callback(socketReply));
    });
  }
}
