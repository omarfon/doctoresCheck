import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaspendientesComponent } from './citaspendientes.component';

describe('CitaspendientesComponent', () => {
  let component: CitaspendientesComponent;
  let fixture: ComponentFixture<CitaspendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaspendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaspendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
