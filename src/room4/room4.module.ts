import { Module } from '@nestjs/common';
import { Room4Gateway } from './room4.gateway';

@Module({
  imports: [],
  providers: [Room4Gateway],
})
export class Room4Module {
}
