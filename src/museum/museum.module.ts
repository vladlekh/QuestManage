import { Module } from '@nestjs/common';
import { MuseumController } from './museum.controller';
import { Room2Module } from '../room2';

@Module({
  imports: [Room2Module],
  controllers: [MuseumController],
})
export class MuseumModule {

}