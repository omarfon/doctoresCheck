import { Component, OnInit, EventEmitter, Output, Optional, Inject } from '@angular/core';
import { CieService } from 'src/app/services/cie.service';
import { debounceTime, map } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.scss']
})
export class DiagnosticsComponent implements OnInit {

  diagnostics: any;
  codigo;
  nombre
  diagnosticos: any;
  @Output('diagnostico') diagnostico = new EventEmitter<any>();


  constructor(public cieSrv: CieService,
    private formBuilder: FormBuilder,
    public dialogClose: MatDialogRef<DiagnosticsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getDiagnostic();
  }

  name = new FormControl();
  code = new FormControl();
  diagnosForm: FormGroup = this.formBuilder.group({
    name: this.name,
    code: this.code
  })

  getDiagnostic() {
    this.name.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(data => {
      const nombre = data;
      const codigo = ""
      this.cieSrv.getDatosCie(codigo, nombre).subscribe(data => {
        this.diagnosticos = data;
        /* console.log('evento value:', event.target.value); */
      })
    })
  }


  getDiagnosticCode() {
    this.code.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(data => {
      const code = data
      const name = "";
      this.cieSrv.getDatosCie(code, name).subscribe(data => {
        this.diagnosticos = data;
      })
    })
  }

  sendDiagnostic(d) {
    this.diagnostico.emit(d)
    console.log('this.diagnostic:', this.diagnostico.emit(d));
    console.log('d:', d);
    this.dialogClose.close({
      event: 'close',
      data: {
        data: d
      }
    });
  }
}
