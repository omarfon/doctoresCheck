import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeComponent } from 'src/app/modals/recipe/recipe.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as jsPDF from 'jspdf'


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  @ViewChild('drawer', { static: false }) drawer: ElementRef;
  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;
  public consultas;
  showFiller = false;
  doctorData: any[] = [];
  public _consultas;
  public dataDoctors;
  p: number = 1;

  constructor(public consultaSrv: ConsultasService,
    public modal: MatDialog,
    public matSide: MatSidenavModule) { }

  ngOnInit() {
/*     this.getAllConsultasPerDoctor(); */
    this.getAllConsultas();
  }

  getAllConsultasPerDoctor() {
    this.consultaSrv.getConsultasPerDoctor().subscribe((data: any) => {
      this._consultas = data.map(d => {
        return {
          id: d.payload.doc.id,
          idUser: d.payload.doc.data()['uid'],
          status: d.payload.doc.data()['estado'],
          data: d.payload.doc.data()['newConsulta'],
        }
      })
      this.consultas = this._consultas.filter(x => x.status == 'finalizado');
      let consultas = this.consultas.filter(x => x.data !== undefined);
      this.consultas = consultas;
      console.log('this.consultas:', this.consultas);
    })
  }


 getAllConsultas(){
   this.consultaSrv.getAllConsultas().subscribe(data => {
    const doctores = data.map(d => {
      return {
        id: d.payload.doc.id,
        data: d.payload.doc.data()['data'],
      }
    })
    this.dataDoctors = doctores;
     console.log(this.dataDoctors);
   })
 }

 upDateDoctorVisibility(id){
   console.log('visibility doc', id)
    const idDoc = id.id;
    console.log(idDoc);
   /* this.consultaSrv.updateDoctorVisibility(id).then( req => {
     console.log(req)
   }) */
 }


}
