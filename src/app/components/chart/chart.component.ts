import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { ChartData } from 'src/app/model/chart-data.model';

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

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    this.setBaseChartData();
  }

  setBaseChartData() {
    this.datasets = this.chartData.chartDataSet;
    this.labels = this.chartData.lineChartLabels;
    this.type = this.chartData.type.toLocaleLowerCase();
    this.isDataLoaded = true;
  }

}
