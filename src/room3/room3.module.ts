import { Module } from '@nestjs/common';
import { Room3Gateway } from './room3.gateway';

@Module({
  imports: [],
  providers: [Room3Gateway],
})
export class Room3Module {
}
