import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER = API_ENDPOINT
  private public_autho = `${this.SERVER}users/public-authorization`;
  private login_doc = `${this.SERVER}auth/login-doctor`;


  constructor(public http: HttpClient, public afa: AngularFireAuth) { }

  getKey(){
    return this.http.get(this.public_autho).pipe(
      map(data =>{
        return data
      })
    )
  }

  
 /*  login(email, password){
  
    let params = {username: email, password: password, app:"notas"};
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.post(this.login_doc, params, {headers}).pipe(
              map((resp:any)=>{
                return resp
              })
          )
  } */

  login(email, password){
    return this.afa.auth.signInWithEmailAndPassword(email, password).then(res => { return res}) .catch(err => {
      return err
    });
  }
}
