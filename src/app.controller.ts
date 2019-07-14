import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';
import SerialPort = require('serialport');

// const serial = new SerialPort('/dev/ttyUSB0', {
//   baudRate: 9600,
// });

// serial.on('data', (data) => {
//   console.log('DATA-READ:', data.toString('utf8'));
// });

// const parser = new Readline({ delimiter: '\n' });
// serial.pipe(parser);
// parser.on('data', console.log);

@Controller('room1')
@ApiUseTags('room1')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('')
  test() {
    return this.appService.getHello();
  }

  @Post('box/open')
  async openBox(): Promise<any> {
    // try {
    //   return new Promise((resolve, reject) => {
    //     serial.write(Buffer.from('openBox'), (err, length) => {
    //       if (!err) {
    //         return resolve(length);
    //       }
    //       reject(err);
    //     });
    //   });
    //
    // } catch (e) {
    //   throw new InternalServerErrorException(e);
    // }
    // this.appService.emit();
  }

  @Post('reset')
  async reset(): Promise<any> {
    // try {
    //   return new Promise((resolve, reject) => {
    //     serial.write(Buffer.from('reset'), (err, length) => {
    //       if (!err) {
    //         return resolve(length);
    //       }
    //       reject(err);
    //     });
    //   });
    //
    // } catch (e) {
    //   throw new InternalServerErrorException(e);
    // }
  }
}
