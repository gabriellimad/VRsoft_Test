/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NotificacaoService } from './notificacao.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Notificacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificacaoService]
    });
  });

  it('should ...', inject([NotificacaoService], (service: NotificacaoService) => {
    expect(service).toBeTruthy();
  }));
});
