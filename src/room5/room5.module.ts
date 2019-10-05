import { Module } from '@nestjs/common';
import { Room5Gateway } from './room5.gateway';

@Module({
  imports: [],
  providers: [Room5Gateway],
})
export class Room5Module {
}
