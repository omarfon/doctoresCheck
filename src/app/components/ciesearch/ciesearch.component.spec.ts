import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiesearchComponent } from './ciesearch.component';

describe('CiesearchComponent', () => {
  let component: CiesearchComponent;
  let fixture: ComponentFixture<CiesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
