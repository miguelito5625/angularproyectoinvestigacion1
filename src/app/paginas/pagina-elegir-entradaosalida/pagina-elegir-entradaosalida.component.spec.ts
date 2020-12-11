import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaElegirEntradaosalidaComponent } from './pagina-elegir-entradaosalida.component';

describe('PaginaElegirEntradaosalidaComponent', () => {
  let component: PaginaElegirEntradaosalidaComponent;
  let fixture: ComponentFixture<PaginaElegirEntradaosalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaElegirEntradaosalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaElegirEntradaosalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
