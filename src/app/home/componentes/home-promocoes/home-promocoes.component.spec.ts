import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePromocoesComponent } from './home-promocoes.component';

describe('HomePromocoesComponent', () => {
  let component: HomePromocoesComponent;
  let fixture: ComponentFixture<HomePromocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePromocoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
