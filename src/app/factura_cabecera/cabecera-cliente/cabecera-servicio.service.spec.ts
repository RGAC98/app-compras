import { TestBed } from '@angular/core/testing';

import { CabeceraServicioService } from './cabecera-servicio.service';

describe('CabeceraServicioService', () => {
  let service: CabeceraServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabeceraServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
