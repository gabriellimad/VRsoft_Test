import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { NotificacaoGateway } from 'src/gateway/notificacao.gateway';

@Injectable()
export class MessagingService {
  private statusMap = new Map<string, string>();
  private readonly entradaQueue = 'fila.notificacao.entrada.gabriel';
  private readonly statusQueue = 'fila.notificacao.status.gabriel';

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly notificacaoGateway: NotificacaoGateway,
  ) {}

  // Publica mensagem na fila de entrada
  async sendMessage(data: { mensagemId: string; conteudoMensagem: string }) {
    await this.amqpConnection.publish('notificacao-exchange', this.entradaQueue, data);
    this.statusMap.set(data.mensagemId, 'AGUARDANDO PROCESSAMENTO');
  }

  // Consome fila de entrada e processa
  @RabbitSubscribe({
    exchange: 'notificacao-exchange',
    routingKey: 'fila.notificacao.entrada.gabriel',
    queue: 'fila.notificacao.entrada.gabriel',
  })
  public async handleEntrada(msg: { mensagemId: string; conteudoMensagem: string }) {
    console.log('Mensagem recebida:', msg);

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const numero = Math.floor(Math.random() * 10) + 1;
    const status = numero <= 2 ? 'FALHA_PROCESSAMENTO' : 'PROCESSADO_SUCESSO';

    this.statusMap.set(msg.mensagemId, status);

    await this.amqpConnection.publish('notificacao-exchange', this.statusQueue, { mensagemId: msg.mensagemId, status });

    console.log(`Mensagem ${msg.mensagemId} processada com status: ${status}`);
  }

  // Consome fila de status e emite via WebSocket
  @RabbitSubscribe({
    exchange: 'notificacao-exchange',
    routingKey: 'fila.notificacao.status.gabriel',
    queue: 'fila.notificacao.status.gabriel',
  })
  public handleStatus(msg: { mensagemId: string; status: string }) {
    console.log('Status recebido:', msg);

    this.statusMap.set(msg.mensagemId, msg.status);

    this.notificacaoGateway.enviarStatus(msg.mensagemId, msg.status);
  }

  // Consulta status por mensagemId
  getStatus(mensagemId: string): string | undefined {
    return this.statusMap.get(mensagemId);
  }
}
