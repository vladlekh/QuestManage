import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SerialGateway } from '../infrastructure/gateway';
import { PortConfigService } from '../infrastructure/port-config';
import { EmitterService } from '../infrastructure/emitter';
import { LoggerService } from '../infrastructure/logger/logger.service';

@WebSocketGateway(1081, { namespace: 'room5' })
export class Room5Gateway extends SerialGateway('room5') {
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
