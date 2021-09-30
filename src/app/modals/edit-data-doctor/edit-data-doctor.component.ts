import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-edit-data-doctor',
  templateUrl: './edit-data-doctor.component.html',
  styleUrls: ['./edit-data-doctor.component.scss']
})
export class EditDataDoctorComponent implements OnInit {

  public dataDoctor;
  public fraseCorta;
  public fraseExtendida
  public formacion;
  public enferquetrato;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public consultaSrv: ConsultasService, public matDialogRef: MatDialogRef<EditDataDoctorComponent>) { }

  ngOnInit() {
    this.dataDoctor = this.data.data;
    console.log(this.dataDoctor);
  }


  upDateDataPatient(){
    let data = {
      fraseCorta : this.dataDoctor.fraseCorta,
      fraseExtendida : this.dataDoctor.fraseExtendida,
      formacion : this.dataDoctor.formacion,
      enferquetrato : this.dataDoctor.enferquetrato
    }
    let id = this.dataDoctor.idDoc;
    this.consultaSrv.actualiceDataPerUser(data, id).then(resp => {
      this.matDialogRef.close();
    })
  }

  close(){
  this.matDialogRef.close();
}


}
