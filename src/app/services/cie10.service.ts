import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Cie10Service {

  private apiCie10 = 'https://cpockets.com/ajaxsearch10?term='

  constructor(public http: HttpClient) { }

  getTerminCie(){
    return this.http.get(this.apiCie10).pipe(
      map(resp =>{
        return resp
      })
    )
  }
}
