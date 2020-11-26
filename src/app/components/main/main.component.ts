import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChartState } from 'src/app/store/chart.state';
import { Subscription } from 'rxjs';
import { ChartData } from 'src/app/model/chart-data.model';
import { Page } from 'src/app/model/page/page.model';
import { PaginatorOptions } from 'src/app/model/page/paginator-options.model';
import { Pageable } from 'src/app/model/page/pageable.model';
import { GetChartsRequest } from 'src/app/store/chart.actions';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  charts: ChartData[] = [];
  page: Page = new Page();
  pagintorOptions: PaginatorOptions = new PaginatorOptions();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(ChartState.charts).subscribe(charts => this.charts = charts),
      this.store.select(ChartState.page).subscribe(page => this.handlePageSubscribe(page))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  handlePageSubscribe(page: Page) {
    this.page = page;
    this.pagintorOptions.datasource = page?.content;
    this.pagintorOptions.pageIndex = page?.number;
    this.pagintorOptions.pageSize = page?.numberOfElements;
    this.pagintorOptions.length = page?.totalElements;
  }

  getCharts(event) {
    console.log(event);
    const pageable = new Pageable();
    pageable.size = 2;
    pageable.page = event.pageIndex;
    this.store.dispatch(new GetChartsRequest(pageable));
  }

}
