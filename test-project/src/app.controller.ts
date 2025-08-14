import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MessagingService } from './rabbit-services/messaging.service';

@Controller()
export class AppController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('/api/notificar')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendMessage(
    @Body('mensagemId') mensagemId: string,
    @Body('conteudoMensagem') conteudoMensagem: string
  ) {
    if (!mensagemId || !conteudoMensagem || conteudoMensagem.trim() === '') {
      throw new BadRequestException('O campo conteudoMensagem não pode ser vazio.');
    }

    await this.messagingService.sendMessage({
      mensagemId,
      conteudoMensagem
    });

    return {
      status: 'AGUARDANDO PROCESSAMENTO',
      mensagemId
    };
  }
}
