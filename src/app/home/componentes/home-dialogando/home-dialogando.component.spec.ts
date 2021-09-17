import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDialogandoComponent } from './home-dialogando.component';

describe('HomeDialogandoComponent', () => {
  let component: HomeDialogandoComponent;
  let fixture: ComponentFixture<HomeDialogandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDialogandoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDialogandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
