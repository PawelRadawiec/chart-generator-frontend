import { ChartData } from '../model/chart-data.model';
import { ChartType } from '../components/upload/upload.component';


export class UploadRequest {
    static readonly type = '[Chart] UploadRequest';

    constructor(
        public payload: File,
        public chartType: ChartType
    ) {
    }
}

export class UploadResponse {
    static readonly type = '[Chart] UploadResponse';

    constructor(public response: ChartData) {
    }
}

export class GetChartsRequest {
    static readonly type = '[Chart] GetChartsRequest';

    constructor() { }
}

export class GetChartsResponse {
    static readonly type = '[Chart] GetChartsResponse';

    constructor(public response: ChartData[]) { }
}
