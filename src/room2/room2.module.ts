import { Module } from '@nestjs/common';
import { Room2Gateway } from './room2.gateway';

@Module({
  imports: [],
  providers: [Room2Gateway],
  exports: [Room2Gateway]
})
export class Room2Module {
}
