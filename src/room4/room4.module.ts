import { Module } from '@nestjs/common';
import { Room4Gateway } from './room4.gateway';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [Room4Gateway],
})
export class Room4Module {
}
