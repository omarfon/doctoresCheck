import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrologinComponent } from './errologin.component';

describe('ErrologinComponent', () => {
  let component: ErrologinComponent;
  let fixture: ComponentFixture<ErrologinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrologinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
