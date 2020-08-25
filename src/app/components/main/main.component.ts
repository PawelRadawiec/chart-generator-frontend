import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChartState } from 'src/app/store/chart.state';
import { Subscription } from 'rxjs';
import { ChartData } from 'src/app/model/chart-data.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  charts: ChartData[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.store.select(ChartState.charts).subscribe(charts => this.charts = charts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
