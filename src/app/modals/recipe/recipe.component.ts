import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaComponent } from 'src/app/paginas/cita/cita.component';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;
  public receta;
  public doctorData;
  public dataPaciente;


  constructor(public route: Router,
    public activateRouter: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.receta = this.data.c.data.prescription;
    this.dataPaciente = this.data.c.data;

    let doctordata = localStorage.getItem('dataDoctor');
    this.doctorData = JSON.parse(doctordata);
    console.log(this.doctorData);
  }





}
