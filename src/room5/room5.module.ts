import { Module } from '@nestjs/common';
import { Room5Gateway } from './room5.gateway';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [Room5Gateway],
})
export class Room5Module {
}
