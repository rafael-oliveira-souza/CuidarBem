import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDeAcoesComponent } from './barra-de-acoes.component';

describe('BarraDeAcoesComponent', () => {
  let component: BarraDeAcoesComponent;
  let fixture: ComponentFixture<BarraDeAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraDeAcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDeAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
