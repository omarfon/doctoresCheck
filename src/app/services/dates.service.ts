import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  private SERVER = API_ENDPOINT;
  private url = `${this.SERVER}ebooking/agenda-doctor?professionalid=`;

  public dataDoctor: any;
  public dataId: any;
  constructor(public http: HttpClient) {
    this.dataDoctor = localStorage.getItem('dataDoctor');
    console.log(this.dataDoctor);
  }


  getDates() {
    this.dataId = JSON.parse(this.dataDoctor)
    const idDoctor = this.dataId.professionalId;
    console.log(idDoctor);
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.url + idDoctor, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }

}
