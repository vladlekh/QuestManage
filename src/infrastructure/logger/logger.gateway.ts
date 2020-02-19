import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(1081, { namespace: 'logger' })
export class LoggerGateway {
  @WebSocketServer()
  server: Server;

  emit(message: string, port: string) {
    this.server.emit('questLogger', { message, port });
  }
}
