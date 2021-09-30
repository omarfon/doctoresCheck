import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataDoctorComponent } from './edit-data-doctor.component';

describe('EditDataDoctorComponent', () => {
  let component: EditDataDoctorComponent;
  let fixture: ComponentFixture<EditDataDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDataDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
