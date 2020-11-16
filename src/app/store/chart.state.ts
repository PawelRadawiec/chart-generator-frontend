import { ChartData } from '../model/chart-data.model';
import { State, Store, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UploadService } from '../service/upload.service';
import { DeleteChartByIdRequest, DeleteChartByIdResponse, GetChartsRequest, GetChartsResponse, UploadRequest, UploadResponse } from './chart.actions';
import { mergeMap } from 'rxjs/operators';
import { ChartDataService } from '../service/chart-data.service';

export interface ChartStateModel {
    chartData: ChartData;
    charts: ChartData[];
}

@State<ChartStateModel>({
    name: 'charts',
    defaults: {
        chartData: null,
        charts: []
    }
})

@Injectable()
export class ChartState {

    constructor(
        private store: Store,
        private uploadService: UploadService,
        private chartDataService: ChartDataService
    ) {
    }

    @Selector()
    static chartData(state: ChartStateModel) {
        return state.chartData;
    }

    @Selector()
    static charts(state: ChartStateModel) {
        return state.charts;
    }

    @Action(UploadRequest)
    uploadRequestAction(state: StateContext<ChartStateModel>, action: UploadRequest) {
        return this.uploadService.upload(action.payload, action.chartType).pipe(
            mergeMap(response => this.store.dispatch(new UploadResponse(response)))
        );
    }

    @Action(UploadResponse)
    uploadResponseAction(state: StateContext<ChartStateModel>, action: UploadResponse) {
        const updatedCharts = state.getState().charts;
        updatedCharts.push(action.response);
        state.patchState({
            chartData: action.response,
            charts: updatedCharts
        });
    }

    @Action(GetChartsRequest)
    getChartsRequest(state: StateContext<ChartStateModel>, action: GetChartsRequest) {
        return this.chartDataService.search().pipe(
            mergeMap(response => this.store.dispatch(new GetChartsResponse(response)))
        );
    }

    @Action(GetChartsResponse)
    getChartsResponse(state: StateContext<ChartStateModel>, action: GetChartsResponse) {
        state.patchState({
            charts: action.response
        });
    }

    @Action(DeleteChartByIdRequest)
    deleteChartByIdRequest(state: StateContext<ChartStateModel>, action: DeleteChartByIdRequest) {
        return this.chartDataService.delete(action.id).pipe(
            mergeMap(response => this.store.dispatch(new DeleteChartByIdResponse(response)))
        );
    }

    @Action(DeleteChartByIdResponse)
    deleteChartByIdResponse(state: StateContext<ChartStateModel>, action: DeleteChartByIdResponse) {
        state.patchState({
            charts: action.response
        });
    }

}
