import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMinhaContaComponent } from './home-minha-conta.component';

describe('HomeMinhaContaComponent', () => {
  let component: HomeMinhaContaComponent;
  let fixture: ComponentFixture<HomeMinhaContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMinhaContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMinhaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
