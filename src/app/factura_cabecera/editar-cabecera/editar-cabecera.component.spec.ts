import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCabeceraComponent } from './editar-cabecera.component';

describe('EditarCabeceraComponent', () => {
  let component: EditarCabeceraComponent;
  let fixture: ComponentFixture<EditarCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
