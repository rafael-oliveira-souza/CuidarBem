import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePorIdadeComponent } from './home-por-idade.component';

describe('HomePorIdadeComponent', () => {
  let component: HomePorIdadeComponent;
  let fixture: ComponentFixture<HomePorIdadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePorIdadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePorIdadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
