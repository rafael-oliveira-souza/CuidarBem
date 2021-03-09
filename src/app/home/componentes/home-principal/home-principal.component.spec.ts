import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomePrincipalComponent } from './home-principal.component';

describe('HomePrincipalComponent', () => {
  let component: HomePrincipalComponent;
  let fixture: ComponentFixture<HomePrincipalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
