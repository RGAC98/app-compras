import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSaldosComponent } from './reporte-saldos.component';

describe('ReporteSaldosComponent', () => {
  let component: ReporteSaldosComponent;
  let fixture: ComponentFixture<ReporteSaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteSaldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
