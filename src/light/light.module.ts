import { Module } from '@nestjs/common';
import { LightGateway } from './light.gateway';

@Module({
  providers: [LightGateway],
})
export class LightModule {
}
