import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class EmitterService {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(msg) {
    this.emitter.emit(msg);
  }

  subscribe(replies: string[], callback: (msg: string) => void) {
    replies.forEach(reply => {
      this.emitter.on(reply, () => callback(reply));
    });
  }
}
