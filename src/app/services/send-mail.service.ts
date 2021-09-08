import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  private SERVER = API_ENDPOINT;
  private url = `${this.SERVER}ebooking/enviar-receta`;

  constructor(public http: HttpClient) { }


  SendRecipe(data) {
    let params = data;
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.post(this.url, params, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )

  }
}
