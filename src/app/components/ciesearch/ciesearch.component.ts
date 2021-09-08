import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ciesearch',
  templateUrl: './ciesearch.component.html',
  styleUrls: ['./ciesearch.component.scss']
})
export class CiesearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.search.valueChanges
      .pipe(
        debounceTime(300)
      ).subscribe(value => this.searchEmitter.emit(value));
  }

  search = new FormControl('');

  @Output('search') searchEmitter = new EventEmitter<string>();

}
