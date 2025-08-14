import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { NotificacaoService } from './service/notificacao.service';
import { WebSocketService } from '../../global-services/web-socket.service';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notificacao.component.html'
})
export class NotificacaoComponent implements OnInit {
  conteudoMensagem = '';
  notificacoes: { mensagemId: string; conteudoMensagem: string; status: string }[] = [];

  constructor(
    private notificacaoService: NotificacaoService,
    private webSocketService: WebSocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.webSocketService.onStatusAtualizado().subscribe((data) => {
        const index = this.notificacoes.findIndex(n => n.mensagemId === data.mensagemId);
        if (index !== -1) {
          this.notificacoes[index].status = data.status;
        }
      });
    }
  }

  enviarNotificacao() {
    if (!this.conteudoMensagem.trim()) {
      alert('Mensagem não pode ser vazia');
      return;
    }

    const mensagemId = uuidv4();
    this.notificacoes.push({ mensagemId, conteudoMensagem: this.conteudoMensagem, status: 'AGUARDANDO PROCESSAMENTO' });

    this.notificacaoService.enviarNotificacao(mensagemId, this.conteudoMensagem)
      .subscribe({
        next: () => console.log('Enviado!'),
        error: err => console.error(err)
      });

    this.conteudoMensagem = '';
  }
}
