import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MessagingService } from './rabbit-services/messaging.service';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let messagingService: MessagingService;

  const mockMessagingService = {
    sendMessage: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: MessagingService,
          useValue: mockMessagingService
        }
      ]
    }).compile();

    appController = module.get<AppController>(AppController);
    messagingService = module.get<MessagingService>(MessagingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status "AGUARDANDO PROCESSAMENTO" when message is valid', async () => {
    const mensagemId = '123';
    const conteudoMensagem = 'Teste de mensagem';

    const result = await appController.sendMessage(mensagemId, conteudoMensagem);

    expect(result).toEqual({
      status: 'AGUARDANDO PROCESSAMENTO',
      mensagemId
    });

    expect(mockMessagingService.sendMessage).toHaveBeenCalledWith({
      mensagemId,
      conteudoMensagem
    });
  });

  it('should throw BadRequestException if conteudoMensagem is empty', async () => {
    const mensagemId = '123';
    const conteudoMensagem = '  '; // string vazia após trim

    await expect(appController.sendMessage(mensagemId, conteudoMensagem))
      .rejects
      .toThrow(BadRequestException);

    expect(mockMessagingService.sendMessage).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if mensagemId is missing', async () => {
    const conteudoMensagem = 'Teste';

    await expect(appController.sendMessage('', conteudoMensagem))
      .rejects
      .toThrow(BadRequestException);

    expect(mockMessagingService.sendMessage).not.toHaveBeenCalled();
  });
});
