import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedirTemperaturaComponent } from './pagina-medir-temperatura.component';

describe('PaginaMedirTemperaturaComponent', () => {
  let component: PaginaMedirTemperaturaComponent;
  let fixture: ComponentFixture<PaginaMedirTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaMedirTemperaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedirTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
