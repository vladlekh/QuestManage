import { CacheInterceptor, Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import * as fs from 'fs';

@Controller('sound')
export class SoundController {
  @Get()
  @UseInterceptors(CacheInterceptor)
  getSoundsList() {
    return [
      {
        name: 'room1',
        displayName: 'Комната 1',
        endpoint: 'room1',
      },
      {
        name: 'room2',
        displayName: 'Комната 2',
        endpoint: 'room2',
      },
      {
        name: 'room3',
        displayName: 'Комната 3',
          endpoint: 'room3',
      },
      {
        name: 'room4',
        displayName: 'Комната 4',
        endpoint: 'room4',
      },
      {
        name: 'room5',
        displayName: 'Комната 5',
        endpoint: 'room5',
      },
    ];
  }

  @Get('room1')
  @UseInterceptors(CacheInterceptor)
  room1Sound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/room1.mp3');
    fileReadStream.pipe(res);
  }

  @Get('room1/fire')
  @UseInterceptors(CacheInterceptor)
  room1FireSound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/fire.mp3');
    fileReadStream.pipe(res);
  }

  @Get('room2')
  @UseInterceptors(CacheInterceptor)
  room2Sound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/room2.mp3');
    fileReadStream.pipe(res);
  }

  @Get('room3')
  @UseInterceptors(CacheInterceptor)
  room3Sound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/room3.mp3');
    fileReadStream.pipe(res);
  }

  @Get('room4')
  @UseInterceptors(CacheInterceptor)
  room4Sound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/room4.mp3');
    fileReadStream.pipe(res);
  }

  @Get('room4/watches')
  @UseInterceptors(CacheInterceptor)
  room4WatchesSound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/watches.mp3');
    fileReadStream.pipe(res);
  }

  @Get('room5')
  @UseInterceptors(CacheInterceptor)
  room5Sound(@Res() res) {
    const fileReadStream = fs.createReadStream('assets/room5.mp3');
    fileReadStream.pipe(res);
  }
}
