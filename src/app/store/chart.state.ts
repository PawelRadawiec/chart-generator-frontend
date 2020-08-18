import { ChartData } from '../model/chart-data.model';
import { State, Store, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UploadService } from '../service/upload.service';
import { UploadRequest, UploadResponse } from './chart.actions';
import { mergeMap } from 'rxjs/operators';

export interface ChartStateModel {
    chartData: ChartData;
}

@State<ChartStateModel>({
    name: 'charts',
    defaults: {
        chartData: null
    }
})

@Injectable()
export class ChartState {

    constructor(
        private store: Store,
        private uploadService: UploadService
    ) {
    }

    @Selector()
    static chartData(state: ChartStateModel) {
        return state.chartData;
    }

    @Action(UploadRequest)
    uploadRequestAction(state: StateContext<ChartStateModel>, action: UploadRequest) {
        return this.uploadService.upload(action.payload, action.chartType).pipe(
            mergeMap(response => this.store.dispatch(new UploadResponse(response)))
        );
    }

    @Action(UploadResponse)
    uploadResponseAction(state: StateContext<ChartStateModel>, action: UploadResponse) {
        state.patchState({
            chartData: action.response
        });
    }

}
