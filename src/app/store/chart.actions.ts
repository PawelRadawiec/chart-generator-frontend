import { ChartData } from '../model/chart-data.model';


export class UploadRequest {
    static readonly type = '[Chart] UploadRequest';

    constructor(public payload: File) {
    }
}

export class UploadResponse {
    static readonly type = '[Chart] UploadResponse';

    constructor(public response: ChartData) {
    }
}
