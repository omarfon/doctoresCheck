import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetPermissionsService {
  private SERVER = API_ENDPOINT;
  private url = `${this.SERVER}ebooking/token-doctor?patientid=`;
  private urlquit = `${this.SERVER}ebooking/video-rooms?appointmentid=`;


  constructor(public http: HttpClient) { }


  getPermissionsVideo(patientId, appointmentid) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.url + `${patientId}&appointmentid=${appointmentid}`, { headers }).pipe(
      map((resp: any) => {
        return resp
      })/* .catch(e =>{
                console.log('error desde el servidor:',e);
              }) */
    )
  }

  quitPermissions(appointmentId) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.delete(this.urlquit + appointmentId, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }

}
