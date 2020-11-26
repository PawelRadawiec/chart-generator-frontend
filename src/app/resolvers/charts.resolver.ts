import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from '../model/chart-data.model';
import { Pageable } from '../model/page/pageable.model';
import { GetChartsRequest } from '../store/chart.actions';
import { ChartState } from '../store/chart.state';

@Injectable()
export class ChartsResolver implements Resolve<any>{


    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ChartData[]> {
        const pageable = new Pageable();
        pageable.size = 2;
        pageable.page = 0;
        return this.store.dispatch(new GetChartsRequest(pageable)).pipe(
            map(() => this.store.selectSnapshot(ChartState))
        );
    }

}