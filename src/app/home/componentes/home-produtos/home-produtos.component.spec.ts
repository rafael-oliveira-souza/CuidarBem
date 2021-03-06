import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProdutosComponent } from './home-produtos.component';

describe('HomeProdutosComponent', () => {
  let component: HomeProdutosComponent;
  let fixture: ComponentFixture<HomeProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
