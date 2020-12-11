import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDetalleSalidaComponent } from './pagina-detalle-salida.component';

describe('PaginaDetalleSalidaComponent', () => {
  let component: PaginaDetalleSalidaComponent;
  let fixture: ComponentFixture<PaginaDetalleSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaDetalleSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDetalleSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
