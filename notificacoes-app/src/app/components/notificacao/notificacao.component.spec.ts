import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NotificacaoComponent } from './notificacao.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificacaoService } from './service/notificacao.service';
import { WebSocketService } from '../../global-services/web-socket.service';
import { of } from 'rxjs';

describe('NotificacaoComponent', () => {
  let component: NotificacaoComponent;
  let fixture: ComponentFixture<NotificacaoComponent>;
  let mockService: jasmine.SpyObj<NotificacaoService>;
  let mockWebSocket: jasmine.SpyObj<WebSocketService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('NotificacaoService', ['enviarNotificacao']);
    mockService.enviarNotificacao.and.returnValue(of({}));

    mockWebSocket = jasmine.createSpyObj('WebSocketService', ['onStatusAtualizado']);
    mockWebSocket.onStatusAtualizado.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [NotificacaoComponent, FormsModule, CommonModule],
      providers: [
        { provide: NotificacaoService, useValue: mockService },
        { provide: WebSocketService, useValue: mockWebSocket }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve enviar a notificação e adicionar à lista com status inicial', () => {
    component.conteudoMensagem = 'Teste';
    component.enviarNotificacao();
    expect(component.notificacoes.length).toBe(1);
    expect(component.notificacoes[0].status).toBe('AGUARDANDO PROCESSAMENTO');
    expect(mockService.enviarNotificacao).toHaveBeenCalled();
  });
});
