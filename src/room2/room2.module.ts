import { Module } from '@nestjs/common';
import { Room2Gateway } from './room2.gateway';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [Room2Gateway],
  exports: [Room2Gateway]
})
export class Room2Module {
}
