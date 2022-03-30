import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private SERVER = API_ENDPOINT;
  _url= this.SERVER + 'ebooking/doctors/datos-doctores'
  _url2= this.SERVER + 'ebooking/doctors/update'
  private upImage = `${this.SERVER}ebooking/upload-photo/professional`;

  constructor(private http: HttpClient) { 
    console.log("datos de doctores")
    
  }
  getinfodoctor(){
     
    return this.http.get(this._url).pipe(
      map(resp => {
        return resp
      })
    );
  }
  updatestatusdoctor(professionalId: number): Observable<any>{
    return this.http.put(this._url2, {
      professionalId: professionalId,
      visible : true
    }).pipe(
      map(resp => {
        return resp
      })
    );
   
  }
  actualiceDataPerUser(data, id):  Observable<any> {
    return this.http.put(this._url2, {
      
        professionalId: id,
        shortSpeach: data.fraseCorta,
        longSpeach: data.fraseExtendida,
        enferquetrato: data.enferquetrato,
        
        
    
      
    }).pipe(
      map(resp => {
        return resp
      })
    );
    
   
  }
  
  
 
 

}

