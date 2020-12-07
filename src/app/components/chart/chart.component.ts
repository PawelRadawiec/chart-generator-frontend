import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { ChartData } from 'src/app/model/chart-data.model';
import { Store } from '@ngxs/store';
import { DeleteChartByIdRequest } from 'src/app/store/chart.actions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartData: ChartData;

  datasets: ChartDataSets[] = [{ data: [] }];
  labels: string[] = [];
  type: string;
  isDataLoaded = false;
  chartLegened = false;

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  lineChartPlugins = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.setBaseChartData();
  }

  setBaseChartData() {
    this.datasets = this.chartData?.chartDataSet;
    this.labels = this.chartData?.lineChartLabels;
    this.type = this.chartData?.type.toLocaleLowerCase();
    this.isDataLoaded = true;
  }

  delete() {
    this.store.dispatch(new DeleteChartByIdRequest(this.chartData?.id));
  }

}
