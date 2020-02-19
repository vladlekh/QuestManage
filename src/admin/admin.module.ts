import { Module } from '@nestjs/common';
import { AdminGateway } from './admin.gateway';
import { LoggerModule } from '../infrastructure/logger/logger.module';
import { Room5Module } from '../room5';

@Module({
  imports: [LoggerModule, Room5Module],
  providers: [AdminGateway],
})
export class AdminModule {
}
