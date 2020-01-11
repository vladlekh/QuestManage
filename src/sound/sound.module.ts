import { CacheModule, Module } from '@nestjs/common';
import { SoundController } from './sound.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [SoundController],
})
export class SoundModule {
}
