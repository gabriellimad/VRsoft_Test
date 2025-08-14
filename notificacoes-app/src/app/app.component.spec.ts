import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificacaoService } from './components/notificacao/service/notificacao.service';
import { WebSocketService } from './global-services/web-socket.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockNotificacaoService: jasmine.SpyObj<NotificacaoService>;
  let mockWebSocketService: jasmine.SpyObj<WebSocketService>;

  beforeEach(async () => {
    mockNotificacaoService = jasmine.createSpyObj('NotificacaoService', ['enviarNotificacao']);
    mockNotificacaoService.enviarNotificacao.and.returnValue(of({}));

    mockWebSocketService = jasmine.createSpyObj('WebSocketService', ['onStatusAtualizado']);
    mockWebSocketService.onStatusAtualizado.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: NotificacaoService, useValue: mockNotificacaoService },
        { provide: WebSocketService, useValue: mockWebSocketService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
