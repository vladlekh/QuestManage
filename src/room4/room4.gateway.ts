import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SerialGateway } from '../infrastructure/gateway';
import { PortConfigService } from '../infrastructure/port-config';
import { EmitterService } from '../infrastructure/emitter';

@WebSocketGateway(1081, { namespace: 'room4' })
export class Room4Gateway extends SerialGateway('room4') {
  constructor(
    readonly portConfigService: PortConfigService,
    readonly emitterService: EmitterService,
  ) {
    super(portConfigService, emitterService);
  }
  @WebSocketServer()
  server;
}
