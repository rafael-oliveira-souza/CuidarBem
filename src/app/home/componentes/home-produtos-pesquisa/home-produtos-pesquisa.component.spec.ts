import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProdutosPesquisaComponent } from './home-produtos-pesquisa.component';

describe('HomeProdutosPesquisaComponent', () => {
  let component: HomeProdutosPesquisaComponent;
  let fixture: ComponentFixture<HomeProdutosPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProdutosPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProdutosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
