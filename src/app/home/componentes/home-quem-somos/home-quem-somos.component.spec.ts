import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeQuemSomosComponent } from './home-quem-somos.component';

describe('HomeQuemSomosComponent', () => {
  let component: HomeQuemSomosComponent;
  let fixture: ComponentFixture<HomeQuemSomosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeQuemSomosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeQuemSomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
