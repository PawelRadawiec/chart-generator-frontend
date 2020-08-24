import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UploadRequest } from 'src/app/store/chart.actions';

export enum ChartType {
  LINE = 'LINE',
  COLUMN = 'COLUMN'
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  chartType = ChartType;
  type: ChartType;

  options = [
    {
      value: 'COLUMN',
      description: 'Column'
    },
    {
      value: 'LINE',
      description: 'Line'
    }
  ];

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  upload(event) {
    this.store.dispatch(new UploadRequest(
      event.target.files[0],
      this.type
    ));
  }

}
