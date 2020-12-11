import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDetalleEntradaComponent } from './pagina-detalle-entrada.component';

describe('PaginaDetalleEntradaComponent', () => {
  let component: PaginaDetalleEntradaComponent;
  let fixture: ComponentFixture<PaginaDetalleEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaDetalleEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDetalleEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
