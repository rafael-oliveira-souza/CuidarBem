import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTermosUsoComponent } from './home-termos-uso.component';

describe('HomeTermosUsoComponent', () => {
  let component: HomeTermosUsoComponent;
  let fixture: ComponentFixture<HomeTermosUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTermosUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTermosUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
