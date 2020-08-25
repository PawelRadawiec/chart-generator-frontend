import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { Store } from '@ngxs/store';
import { ChartState } from 'src/app/store/chart.state';
import * as _ from 'lodash';
import { ChartData } from 'src/app/model/chart-data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('baseChart') chart: BaseChartDirective;
  private subscription: Subscription;
  chartData: ChartData;

  datasets: ChartDataSets[] = [{ data: [] }];
  labels: string[] = [];
  type = 'line';

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartPlugins = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(ChartState.chartData).subscribe(chartData => this.handleChartData(chartData));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleChartData(chartData: ChartData) {
    if (this.chart !== undefined && chartData) {
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);

      this.setBaseChartData(chartData);
    }
  }

  setBaseChartData(chartData: ChartData) {
    this.chartData = _.cloneDeep(chartData);
    this.datasets = this.chartData.chartDataSet;
    this.labels = this.chartData.lineChartLabels;
    this.type = this.chartData.type.toLocaleLowerCase();
  }

}
