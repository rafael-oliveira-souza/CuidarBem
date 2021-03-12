import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProdutosSaibaMaisComponent } from './home-produtos-saiba-mais.component';

describe('HomeProdutosSaibaMaisComponent', () => {
  let component: HomeProdutosSaibaMaisComponent;
  let fixture: ComponentFixture<HomeProdutosSaibaMaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProdutosSaibaMaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProdutosSaibaMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
