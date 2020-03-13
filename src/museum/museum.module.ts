import { Module } from '@nestjs/common';
import { MuseumController } from './museum.controller';
import { Room2Module } from '../room2';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [Room2Module, LoggerModule],
  controllers: [MuseumController],
})
export class MuseumModule {

}
