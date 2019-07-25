import { Module } from '@nestjs/common';
import { Room1Gateway } from './room1.gateway';

@Module({
  imports: [],
  providers: [Room1Gateway],
})
export class Room1Module {
}
