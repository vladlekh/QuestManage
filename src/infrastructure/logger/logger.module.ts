import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerGateway } from './logger.gateway';

@Module({
  providers: [LoggerService, LoggerGateway],
  exports: [LoggerService],
})
export class LoggerModule {
}
