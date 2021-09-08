import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/services/dates.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-citaspendientes',
  templateUrl: './citaspendientes.component.html',
  styleUrls: ['./citaspendientes.component.scss']
})
export class CitaspendientesComponent implements OnInit {

  public firstname;
  public lastname;
  public citas;
  public consultas;
  public _consultas;

  constructor(public datesSrv: DatesService,
    public router: Router,
    private route: ActivatedRoute,
    public consultaSrv: ConsultasService) { }

  ngOnInit() {
    this.getdatesCompletes();
    this.getDates();
  }

  getDates() {
    this.datesSrv.getDates().subscribe(data => {
      const datos = data.filter(x => x.provisionId === 845337);
      if (datos) {
        this.citas = datos;
        console.log(this.citas);
      }
    }, err => {
      console.log(err);
    });
  }


  goTodetail(c) {
    console.log('c:', c);
    let data = JSON.stringify(c);
    this.router.navigate(['/detalle', data])
  }

  getdatesCompletes() {
    this.consultaSrv.getConsultasPerDoctor().subscribe(data => {
      this.consultas = data.map(d => {
        return {
          id: d.payload.doc.id,
          idUser: d.payload.doc.data()['idUsuaio'],
          nombre: d.payload.doc.data()['nombreUsuario'],
          apellidopUsuario: d.payload.doc.data()['apellidopUsuario'],
          apellidomUsuario: d.payload.doc.data()['apellidomUsuario'],
          diagnostico: d.payload.doc.data()['datosConsulta']['diagnostic'],
          hourDate: d.payload.doc.data()['hourDate'],
          datetime: d.payload.doc.data()['datetime'],
          receta: d.payload.doc.data()['datosConsulta']['prescription'],
        }
      })
    })
  }


}
