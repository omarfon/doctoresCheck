import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CieService {
  private SERVER = API_ENDPOINT
  private apiCie = `${this.SERVER}ebooking/diagnosticos?codigo=`;


  constructor(public http: HttpClient) { }


  getDatosCie(codigo, nombre) {
    console.log('data en servicio:', codigo, nombre);
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.apiCie + `${codigo}&nombre=${nombre}&tipo=CONTIENE`, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }
}
