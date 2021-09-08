import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FarmacosService {
  private SERVER = API_ENDPOINT
  private apiFarmaco = `${this.SERVER}ebooking/farmacos?q=`;

  constructor(public http: HttpClient) { }

  getFarmaco(farmaco) {

    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.apiFarmaco + `${farmaco}&tipo=activo`, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }
}
