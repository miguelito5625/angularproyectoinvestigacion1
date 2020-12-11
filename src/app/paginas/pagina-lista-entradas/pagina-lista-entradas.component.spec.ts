import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaListaEntradasComponent } from './pagina-lista-entradas.component';

describe('PaginaListaEntradasComponent', () => {
  let component: PaginaListaEntradasComponent;
  let fixture: ComponentFixture<PaginaListaEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaListaEntradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaListaEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
