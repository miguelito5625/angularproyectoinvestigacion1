import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaListaElegirEntsalComponent } from './pagina-lista-elegir-entsal.component';

describe('PaginaListaElegirEntsalComponent', () => {
  let component: PaginaListaElegirEntsalComponent;
  let fixture: ComponentFixture<PaginaListaElegirEntsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaListaElegirEntsalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaListaElegirEntsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
