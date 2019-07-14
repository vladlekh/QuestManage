import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import { ISerialPortOptions } from './interfaces';
import { SerialportService } from './serialport.service';
import { EVENT_EMITTER_TOKEN, InjectEventEmitter, NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'events';
import { ConfigService } from 'nestjs-config';
import { SerialPortEventEmitter } from './serialport.event';

interface AsyncModuleOptions {
  useFactory: (...args: any[]) => ISerialPortOptions;
  inject: any[];
}

@Module({})
export class SerialportModule {
  static fotRootAsync(options: AsyncModuleOptions): DynamicModule {
    const providers: Provider[] = [{
      provide: SerialportService,
      useFactory: (configService: ConfigService, emitter: SerialPortEventEmitter) => {
        const serviceOptions = options.useFactory(configService);
        return new SerialportService(emitter, serviceOptions);
      },
      inject: [...options.inject, EVENT_EMITTER_TOKEN],
    }];
    return {
      imports: [NestEmitterModule.forRoot(new EventEmitter())],
      module: SerialportModule,
      providers,
      exports: providers,
    };
  }
}
