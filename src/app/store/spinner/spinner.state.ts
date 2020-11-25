import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UploadDataRequest } from 'src/app/model/upload-request.model';
import { DeleteChartByIdRequest, DeleteChartByIdResponse, GetChartsRequest, GetChartsResponse, UploadRequest, UploadResponse } from '../chart.actions';
import { SpinnerActions } from './spinner.actions';


export const startSpinnerActoins = [
    GetChartsRequest,
    UploadRequest,
    DeleteChartByIdRequest,
];

export const hideSpinnerActions = [
    GetChartsResponse,
    UploadResponse,
    DeleteChartByIdResponse
];

export interface SpinnerStateModel {
    spinner: boolean;
}

@State<SpinnerStateModel>({
    name: 'spinner',
    defaults: {
        spinner: false
    }
})
export class SpinnerState {

    constructor() { }

    @Selector()
    static spinner(state: SpinnerStateModel) {
        return state.spinner;
    }

    @Action(startSpinnerActoins)
    spinnerStart(state: StateContext<SpinnerStateModel>, action: SpinnerActions.SpinnerStart) {
        state.patchState({
            spinner: true
        });
    }

    @Action(hideSpinnerActions)
    spinnerHide(state: StateContext<SpinnerStateModel>, action: SpinnerActions.SpinnerHide) {
        state.patchState({
            spinner: false
        });
    }

}