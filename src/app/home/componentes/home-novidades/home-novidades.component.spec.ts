import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNovidadesComponent } from './home-novidades.component';

describe('HomeNovidadesComponent', () => {
  let component: HomeNovidadesComponent;
  let fixture: ComponentFixture<HomeNovidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNovidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNovidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
