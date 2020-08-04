import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UploadRequest } from 'src/app/store/chart.actions';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  upload(event) {
    this.store.dispatch(new UploadRequest(event.target.files[0]));
  }

}
