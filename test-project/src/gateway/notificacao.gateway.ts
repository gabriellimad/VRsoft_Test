import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificacaoGateway {
  @WebSocketServer()
  server: Server;

  enviarStatus(mensagemId: string, status: string) {
    this.server.emit('statusAtualizado', { mensagemId, status });
  }
}
