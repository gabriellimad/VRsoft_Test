import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  enviarNotificacao(mensagemId: string, conteudoMensagem: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/notificar`, {
      mensagemId,
      conteudoMensagem
    });
  }

  obterStatus(mensagemId: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/notificacao/status/${mensagemId}`);
  }
}
