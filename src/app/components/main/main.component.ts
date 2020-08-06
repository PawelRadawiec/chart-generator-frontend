import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ChartState } from '../../store/chart.state';
import { ChartData } from '../../model/chart-data.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  lineChartData: ChartDataSets[] = [{}];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(ChartState.chartData).subscribe(chartData => this.handleChartData(chartData));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleChartData(chartData: ChartData) {
    if (!chartData) {
      return;
    }
    this.lineChartData = chartData.chartDataSet;
    this.lineChartLabels = chartData.lineChartLabels;
  }


}
