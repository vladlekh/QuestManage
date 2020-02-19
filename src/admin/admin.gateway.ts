import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SerialGateway } from '../infrastructure/gateway';
import { PortConfigService } from '../infrastructure/port-config';
import { EmitterService } from '../infrastructure/emitter';
import { LoggerService } from '../infrastructure/logger/logger.service';
import { Room5Gateway } from '../room5/room5.gateway';
import { IParserReply } from '../interfaces';

@WebSocketGateway(1081, { namespace: 'admin' })
export class AdminGateway extends SerialGateway('admin') {
  constructor(
    readonly portConfigService: PortConfigService,
    readonly emitterService: EmitterService,
    readonly loggerService: LoggerService,
    readonly room5Gateway: Room5Gateway,
  ) {
    super(portConfigService, emitterService, loggerService);
  }

  @WebSocketServer()
  server;

  handlePortMsg = async ({ message, path }: IParserReply) => {
    if (message.startsWith('totalWeight')) {
      await this.room5Gateway.ports.get('table').port.writeCmd(message);
    }
    this.loggerService.logArduinoMessage({ message, path });
    this.server.emit(message, { path });
  };
}
