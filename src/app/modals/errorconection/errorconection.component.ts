import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-errorconection',
  templateUrl: './errorconection.component.html',
  styleUrls: ['./errorconection.component.scss']
})
export class ErrorconectionComponent implements OnInit {

  constructor(public router: Router,
    public matDialogRef: MatDialogRef<ErrorconectionComponent>) { }

  ngOnInit() {
  }

  goToHome() {
    this.matDialogRef.close();
    this.router.navigate(['/home']);
  }

}
