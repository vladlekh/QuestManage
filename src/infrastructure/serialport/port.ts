import * as SerialPort from 'serialport';
import { IPortOpenOptions } from '../../interfaces';
import Timeout = NodeJS.Timeout;
import { ReadlineParser } from '../parser';

export class Port extends SerialPort {
  private interval: Timeout;
  readonly path: string;
  readonly parser: ReadlineParser;

  constructor(path: string, options?: IPortOpenOptions) {
    super(path, { ...options });
    // this.path = path;
    this.parser = new ReadlineParser({ delimiter: '\n', path });
    this.pipe(this.parser);

    // if (options.autoReconnect) {
    //   this.autoConnect();
    // }
  }

  // disconnect() {
  //   clearInterval(this.interval);
  // }

  // async autoConnect() {
  //   this.connect = this.connect.bind(this);
  //   this.connect();
  //   this.interval = setInterval(this.connect, 60000);
  // }

  // async connect(): Promise<void> {
  //   if (this.isOpen) {
  //     return Promise.resolve();
  //   }
  //   try {
  //     await this.open();
  //   } catch (e) {
  //     this.emit('disconnected', e);
  //   }
  // }
  //
  // open(): Promise<Port> {
  //   return new Promise<any>((resolve, reject) => {
  //     super.open(error => {
  //       if (error) {
  //         reject(error);
  //         return;
  //       }
  //       resolve(this);
  //     });
  //   });
  // }

  writeCmd(cmd: string) {
    return new Promise(((resolve, reject) => {
      this.write(Buffer.from(cmd), (err, length) => {
        if (!err) {
          return resolve(length);
        }
        reject(err);
      });
    }));
  }
}
