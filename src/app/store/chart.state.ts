import { ChartData } from '../model/chart-data.model';
import { State, Store, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UploadService } from '../service/upload.service';
import { DeleteChartByIdRequest, DeleteChartByIdResponse, GetChartsRequest, GetChartsResponse, UploadRequest, UploadResponse } from './chart.actions';
import { mergeMap } from 'rxjs/operators';
import { ChartDataService } from '../service/chart-data.service';
import { Page } from '../model/page/page.model';
import { Pageable } from '../model/page/pageable.model';

export interface ChartStateModel {
    page: Page;
    pageable: Pageable;
    charts: ChartData[];
    chartData: ChartData;
}

@State<ChartStateModel>({
    name: 'charts',
    defaults: {
        page: null,
        pageable: null,
        charts: [],
        chartData: null
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
    static page(state: ChartStateModel) {
        return state.page;
    }

    @Selector()
    static charts(state: ChartStateModel) {
        return state.charts;
    }


    @Action(UploadRequest)
    uploadRequestAction(state: StateContext<ChartStateModel>, action: UploadRequest) {
        return this.uploadService.upload(action.payload, action.request).pipe(
            mergeMap(response => this.store.dispatch(new UploadResponse(response)))
        );
    }

    @Action(UploadResponse)
    uploadResponseAction(state: StateContext<ChartStateModel>, action: UploadResponse) {
        state.patchState({
            chartData: action.response
        });
        this.store.dispatch(new GetChartsRequest(state.getState().pageable));
    }

    @Action(GetChartsRequest)
    getChartsRequest(state: StateContext<ChartStateModel>, action: GetChartsRequest) {
        state.patchState({
            pageable: action.pageable
        });
        return this.chartDataService.search(action.pageable).pipe(
            mergeMap(response => this.store.dispatch(new GetChartsResponse(response)))
        );
    }

    @Action(GetChartsResponse)
    getChartsResponse(state: StateContext<ChartStateModel>, action: GetChartsResponse) {
        state.patchState({
            page: action.response,
            charts: action.response.content
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
        this.store.dispatch(new GetChartsRequest(state.getState().pageable));
    }

}
