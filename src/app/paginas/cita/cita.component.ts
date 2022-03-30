import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeComponent } from 'src/app/modals/recipe/recipe.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as jsPDF from 'jspdf'
import { EditDataDoctorComponent } from './../../modals/edit-data-doctor/edit-data-doctor.component';
import { EditImageComponent } from '../../modals/edit-image/edit-image.component';
import { API_ENDPOINT, API_IMAGE } from '../../../environments/environment.prod';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  @ViewChild('drawer', { static: false }) drawer: ElementRef;
  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;
  
  /* showFiller = false;
  doctorData: any[] = [];
  public _consultas;
  p: number = 1; */
  public consultas;
  public dataDoctors;
  public dataDoctors1;
  public urlBase = API_IMAGE;
  public doctorsInfo;
  

  constructor(public consultaSrv: DoctorService,
    public modal: MatDialog,
    public matSide: MatSidenavModule) { }

  ngOnInit() {
/*     this.getAllConsultasPerDoctor(); 
       this.getAllConsultas();      */
       this.getalldoctores();
       this.getInfoDoctores();
    
  }
/*
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
  this.consultaSrv.verifyDoctor(idDoc).then(resp => {
    Swal.fire('Data Aprobada...', 'Listo... acabas de aprobar los datos de este doctor', 'success')
  })
 }
*/
 editDoctor(c){
   console.log(c)
   const dialogRef = this.modal.open(EditDataDoctorComponent, {data:c});
  
  dialogRef.afterClosed().subscribe(result => {
    Swal.fire('Data Actualizada...', 'Listo... acabas de actualiza los datos de este doctor', 'success')
  });
   const modalrEF = this.modal.open(EditDataDoctorComponent, {data:c})
 }

getalldoctores(){
  
  this.consultaSrv.getinfodoctor().subscribe((data: any) =>{
      this.dataDoctors1=data;
      console.log("especial",this.dataDoctors1)
  })
} 
updatestatusdoctores(professionalId: any){
  
  this.consultaSrv.updatestatusdoctor(professionalId).subscribe(data =>{
    
  });
      window.location.reload();
     console.log("d", professionalId)
}
getInfoDoctores(){
  this.consultaSrv.getinfodoctor().subscribe(data => {
    console.log(data);
    this.doctorsInfo = data;
  })
}
upImage(c){
  this.modal.open(EditImageComponent, {data:c});
}
}
