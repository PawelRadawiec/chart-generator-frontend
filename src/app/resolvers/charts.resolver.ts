import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from '../model/chart-data.model';
import { GetChartsRequest } from '../store/chart.actions';
import { ChartState } from '../store/chart.state';

@Injectable()
export class ChartsResolver implements Resolve<any>{


    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ChartData[]> {
        const id = route.params.id;
        const code = route.params.code;
        return this.store.dispatch(new GetChartsRequest()).pipe(
            map(() => this.store.selectSnapshot(ChartState))
        );
    }

}