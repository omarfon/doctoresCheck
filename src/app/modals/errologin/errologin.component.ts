import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-errologin',
  templateUrl: './errologin.component.html',
  styleUrls: ['./errologin.component.scss']
})
export class ErrologinComponent implements OnInit {

  public error;

  constructor(public matDialogref: MatDialogRef<ErrologinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
    this.error = this.data;
  }

  closeToModal() {
    this.matDialogref.close();
  }

}
