import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorconectionComponent } from './errorconection.component';

describe('ErrorconectionComponent', () => {
  let component: ErrorconectionComponent;
  let fixture: ComponentFixture<ErrorconectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorconectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorconectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
