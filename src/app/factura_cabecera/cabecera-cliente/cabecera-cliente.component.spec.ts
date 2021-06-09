import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraClienteComponent } from './cabecera-cliente.component';

describe('CabeceraClienteComponent', () => {
  let component: CabeceraClienteComponent;
  let fixture: ComponentFixture<CabeceraClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
