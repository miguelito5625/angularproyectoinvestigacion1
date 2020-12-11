import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCantidadPersonasComponent } from './pagina-cantidad-personas.component';

describe('PaginaCantidadPersonasComponent', () => {
  let component: PaginaCantidadPersonasComponent;
  let fixture: ComponentFixture<PaginaCantidadPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCantidadPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCantidadPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
