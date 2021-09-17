import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAlugarComponent } from './home-alugar.component';

describe('HomeAlugarComponent', () => {
  let component: HomeAlugarComponent;
  let fixture: ComponentFixture<HomeAlugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAlugarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAlugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
