import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SerialGateway } from '../infrastructure/gateway';
import { PortConfigService } from '../infrastructure/port-config';
import { EmitterService } from '../infrastructure/emitter';
import { LoggerService } from '../infrastructure/logger/logger.service';

@WebSocketGateway(1081, { namespace: 'room3' })
export class Room3Gateway extends SerialGateway('room3') {
  constructor(
    readonly portConfigService: PortConfigService,
    readonly emitterService: EmitterService,
    readonly loggerService: LoggerService,
  ) {
    super(portConfigService, emitterService, loggerService);
  }
  @WebSocketServer()
  server;
}
