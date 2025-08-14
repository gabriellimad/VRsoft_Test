import { Test, TestingModule } from '@nestjs/testing';
import { MessagingService } from './messaging.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { NotificacaoGateway } from 'src/gateway/notificacao.gateway';

describe('MessagingService', () => {
  let service: MessagingService;
  let amqpConnection: AmqpConnection;

  const mockAmqpConnection = {
    publish: jest.fn(),
  };

  const mockNotificacaoGateway = {
    enviarStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagingService,
        { provide: AmqpConnection, useValue: mockAmqpConnection },
        { provide: NotificacaoGateway, useValue: mockNotificacaoGateway },
      ],
    }).compile();

    service = module.get<MessagingService>(MessagingService);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  it('deve publicar mensagem na fila e armazenar status', async () => {
    const mensagem = { mensagemId: '123', conteudoMensagem: 'Teste' };

    await service.sendMessage(mensagem);

    // Verifica se o publish foi chamado corretamente
    expect(amqpConnection.publish).toHaveBeenCalledWith(
      'notificacao-exchange',
      'fila.notificacao.entrada.gabriel',
      mensagem,
    );

    // Verifica se o status foi armazenado no Map
    expect(service.getStatus('123')).toBe('AGUARDANDO PROCESSAMENTO');
  });
});
