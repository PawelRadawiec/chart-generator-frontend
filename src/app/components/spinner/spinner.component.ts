import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpinnerState } from 'src/app/store/spinner/spinner.state';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Select(SpinnerState.spinner) spinner$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }

}
