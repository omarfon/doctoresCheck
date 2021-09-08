import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_IMAGES } from 'src/environments/environment';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public serverImage = API_IMAGES;
  public nombreDoctor;
  public id;
  public data;

  constructor(public router: Router) { }

  ngOnInit() {
    const nombreDoctor = localStorage.getItem('dataDoctor');
    this.data = JSON.parse(nombreDoctor);
    this.id = this.data.professionalId;
    this.nombreDoctor = this.data.displayName;
  }

  closeSesion() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
