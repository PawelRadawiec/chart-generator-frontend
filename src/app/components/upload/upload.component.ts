import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DataSeriesType } from 'src/app/model/data-series-type.model';
import { UploadDataRequest } from 'src/app/model/upload-request.model';
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
  dataSeriesType: DataSeriesType;
  file: any;

  options = [
    {
      value: 'BAR',
      description: 'Bar'
    },
    {
      value: 'LINE',
      description: 'Line'
    },
    {
      value: 'PIE',
      description: 'Pie'
    }
  ];

  seriesOptions = [
    {
      value: 'COLUMNS',
      description: 'Columns'
    },
    {
      value: 'ROWS',
      description: 'Rows'
    }
  ];

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  clear() {
    this.file = null;
    this.type = null;
    this.dataSeriesType = null;
  }

  upload(event) {
    const request = new UploadDataRequest();
    request.type = this.type;
    request.dataSeriesType = this.dataSeriesType;
    const file = event?.target?.files[0];
    (file) ? this.store.dispatch(new UploadRequest(file, request)) : this.clear();
  }

}
