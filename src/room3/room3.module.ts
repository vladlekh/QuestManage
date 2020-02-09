import { Module } from '@nestjs/common';
import { Room3Gateway } from './room3.gateway';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [Room3Gateway],
})
export class Room3Module {
}
