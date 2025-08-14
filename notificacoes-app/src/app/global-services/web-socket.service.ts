// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onStatusAtualizado(): Observable<{ mensagemId: string, status: string }> {
    return new Observable(observer => {
      this.socket.on('statusAtualizado', (data) => {
        observer.next(data);
      });
    });
  }

}
