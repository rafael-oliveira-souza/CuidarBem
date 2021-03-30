import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProdutosBrinquedotecaComponent } from './home-produtos-brinquedoteca.component';

describe('HomeProdutosBrinquedotecaComponent', () => {
  let component: HomeProdutosBrinquedotecaComponent;
  let fixture: ComponentFixture<HomeProdutosBrinquedotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProdutosBrinquedotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProdutosBrinquedotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
