import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SerialGateway } from '../infrastructure/gateway';
import { PortConfigService } from '../infrastructure/port-config';
import { EmitterService } from '../infrastructure/emitter';

@WebSocketGateway(1081, { namespace: 'room1' })
export class Room1Gateway extends SerialGateway('room1') {
  constructor(
    readonly portConfigService: PortConfigService,
    readonly emitterService: EmitterService,
  ) {
    super(portConfigService, emitterService);
  }
  @WebSocketServer()
  server;
}
