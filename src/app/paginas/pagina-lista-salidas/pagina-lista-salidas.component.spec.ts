import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaListaSalidasComponent } from './pagina-lista-salidas.component';

describe('PaginaListaSalidasComponent', () => {
  let component: PaginaListaSalidasComponent;
  let fixture: ComponentFixture<PaginaListaSalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaListaSalidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaListaSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
