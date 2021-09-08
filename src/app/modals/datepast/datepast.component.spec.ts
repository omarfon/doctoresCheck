import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepastComponent } from './datepast.component';

describe('DatepastComponent', () => {
  let component: DatepastComponent;
  let fixture: ComponentFixture<DatepastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
