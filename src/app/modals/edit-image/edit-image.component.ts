import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { API_IMAGE } from 'src/environments/environment';
import { DatesService } from '../../services/dates.service';

export class Archivo{
  constructor(
    photo:string,
    public name: string,
    public imagen: any
  ){}
}
@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {
  public dataDoctor;
  public urlBase = API_IMAGE;
  public image;
  public archivo: Archivo;
  public id;
  public preview: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: 
              any, public matDialogRef: MatDialogRef<EditImageComponent>,
              public sanitizer: DomSanitizer,
              public dataSrv: DatesService) { }

  ngOnInit() {
    this.dataDoctor = this.data.data;
    this.id = this.dataDoctor.idDoc;
    console.log(this.dataDoctor);
  }

  fileEvent(event){
      let file = event.target.files[0];
      this.extraerBase64(file).then((imagen:any) => {
        console.log(imagen);
        this.preview = imagen.base;
      })
      console.log(event,file);
      if(file.type == "image/png"){
        this.archivo = new Archivo('photo',file, file.name);
        console.log('this.archivo:',this.archivo);
      }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) =>{ 
      try{
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = err => {
          resolve({
            base: null
          });
        };
    }catch(e){
      return null
    }
  })



  subirImagen(event: Archivo){
    console.log(this.archivo, event);
    this.dataSrv.upLoadFile(this.archivo).subscribe(response => {
      console.log(response)
    })
  }

}