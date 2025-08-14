import { Component } from '@angular/core';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificacaoComponent],
  template: `<app-notificacao></app-notificacao>`,
})
export class AppComponent {}
