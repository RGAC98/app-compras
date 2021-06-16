import { TestBed } from '@angular/core/testing';

import { ReporteSaldosService } from './reporte-saldos.service';

describe('ReporteSaldosService', () => {
  let service: ReporteSaldosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteSaldosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
