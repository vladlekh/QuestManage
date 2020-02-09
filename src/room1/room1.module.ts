import { Module } from '@nestjs/common';
import { Room1Gateway } from './room1.gateway';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [Room1Gateway],
})
export class Room1Module {
}
