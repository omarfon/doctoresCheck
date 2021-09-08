import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewChild, ElementRef } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-datepast',
  templateUrl: './datepast.component.html',
  styleUrls: ['./datepast.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: true }
  }]
})
export class DatepastComponent implements OnInit {

  public consultas;


  constructor(public consultaSrv: ConsultasService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.data);
    console.log(this.data.patientId);
    this.getDatesPat();
  }


  getDatesPat() {
    const idUser = this.data.data.patientId;
    this.consultaSrv.getDatesPerPatient(idUser).subscribe(data => {
      this.consultas = data;
      console.log(this.consultas);
    });

  }



}
