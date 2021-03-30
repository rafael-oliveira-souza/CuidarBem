import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLojaComponent } from './home-loja.component';

describe('HomeLojaComponent', () => {
  let component: HomeLojaComponent;
  let fixture: ComponentFixture<HomeLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
