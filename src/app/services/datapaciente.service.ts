import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatapacienteService {

  private SERVER = API_ENDPOINT;
  private url = `${this.SERVER}ebooking/datos-paciente?patientid=`;
  
  constructor(private http: HttpClient) { }

  getDatesPatient(id){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.get(this.url + id, {headers}).pipe(
      map((resp:any)=>{
        return resp
      })/* .catch(e =>{
        console.log('error desde el servidor:',e);
      }) */
  )
  }
}
