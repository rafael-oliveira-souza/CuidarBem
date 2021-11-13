import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRodapeComponent } from './home-rodape.component';

describe('HomeRodapeComponent', () => {
  let component: HomeRodapeComponent;
  let fixture: ComponentFixture<HomeRodapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRodapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
