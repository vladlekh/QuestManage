import { DynamicModule, Global, Module } from '@nestjs/common';
import { PortConfigService } from './port-config.service';

@Global()
@Module({})
export class PortConfigModule {
  static load(path: string): DynamicModule {
    const providers = [{
      provide: PortConfigService,
      useValue: new PortConfigService(path),
    }];
    return {
      module: PortConfigModule,
      providers,
      exports: providers,
    };
  }
}
