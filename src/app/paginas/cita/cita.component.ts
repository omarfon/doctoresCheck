import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeComponent } from 'src/app/modals/recipe/recipe.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as jsPDF from 'jspdf'
import { EditDataDoctorComponent } from './../../modals/edit-data-doctor/edit-data-doctor.component';
import Swal from 'sweetalert2'
import { DatesService } from '../../services/dates.service';
import { API_ENDPOINT, API_IMAGE } from '../../../environments/environment';
import { EditImageComponent } from '../../modals/edit-image/edit-image.component';

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
  public doctorsInfo;
  public urlBase = API_IMAGE;

  constructor(public consultaSrv: ConsultasService,
    public modal: MatDialog,
    public datesSrv: DatesService,
    public matSide: MatSidenavModule) { }

  ngOnInit() {
/*     this.getAllConsultasPerDoctor(); */
    this.getAllConsultas();
    this.getInfoDoctores();
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

  getInfoDoctores(){
    this.datesSrv.getInfoDoctors().subscribe(data => {
      console.log(data);
      this.doctorsInfo = data;
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
  this.consultaSrv.verifyDoctor(idDoc).then(resp => {
    Swal.fire('Data Aprobada...', 'Listo... acabas de aprobar los datos de este doctor', 'success')
  })
 }

 editDoctor(c){
  const dialogRef = this.modal.open(EditDataDoctorComponent, {data:c});
  dialogRef.afterClosed().subscribe(result => {
    Swal.fire('Data Actualizada...', 'Listo... acabas de actualiza los datos de este doctor', 'success')
  });
   const modalrEF = this.modal.open(EditDataDoctorComponent, {data:c})
 }

 upImage(c){
    this.modal.open(EditImageComponent, {data:c});
 }


}
