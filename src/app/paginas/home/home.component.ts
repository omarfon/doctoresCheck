import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { DatesService } from 'src/app/services/dates.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private data: any;
  name: any;
  public consultas;
  public totalConsultasprevias;
  public citas;
  public citasPendientes;
  constructor(private router: Router,
    public consultaSrv: ConsultasService,
    public datesSrv: DatesService) { }

  ngOnInit() {
    const nombreDoctor = localStorage.getItem('dataDoctor');
    this.data = JSON.parse(nombreDoctor);
    this.name = this.data.displayName;
    this.getAllConsultas();
    this.getDates();
  }

  goToCitasPendientes() {
    this.router.navigate(['/citaspendientes']);
  }

  goToCitas() {
    this.router.navigate(['/citas']);
  }

  getAllConsultas() {
    this.consultaSrv.getConsultasPerDoctor().subscribe(data => {
      this.consultas = data.map(d => {
        return {
          id: d.payload.doc.id,
        }
      })
      this.totalConsultasprevias = this.consultas.length;
      console.log('this.consultas:', this.consultas);
    })
  }

  getDates() {
    this.datesSrv.getDates().subscribe(data => {
      const datos = data.filter(x => x.provisionId === 845337);
      if (datos) {
        this.citas = datos;
        console.log('data de dates;', this.citas);
      }
      if (this.citas) {
        this.citasPendientes = this.citas.length;
      }
    }, err => {
      console.log(err);
    });
  }

}
