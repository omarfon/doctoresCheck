import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
Router

@Injectable({
  providedIn: 'root'
})
export class AuthoGuard implements CanActivate {

  constructor(public router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const doctorData = localStorage.getItem('dataDoctor');
      if(doctorData){
        this.router.navigate(['/home']);
        return false
      }{
        return true
      }
  }
  
}
