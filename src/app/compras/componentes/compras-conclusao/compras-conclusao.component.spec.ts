import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasConclusaoComponent } from './compras-conclusao.component';

describe('ComprasConclusaoComponent', () => {
  let component: ComprasConclusaoComponent;
  let fixture: ComponentFixture<ComprasConclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasConclusaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasConclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
