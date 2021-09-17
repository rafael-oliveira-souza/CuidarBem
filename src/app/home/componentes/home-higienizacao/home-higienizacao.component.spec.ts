import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHigienizacaoComponent } from './home-higienizacao.component';

describe('HomeHigienizacaoComponent', () => {
  let component: HomeHigienizacaoComponent;
  let fixture: ComponentFixture<HomeHigienizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHigienizacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHigienizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
