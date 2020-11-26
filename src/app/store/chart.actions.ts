import { ChartData } from '../model/chart-data.model';
import { ChartType } from '../components/upload/upload.component';
import { UploadDataRequest } from '../model/upload-request.model';
import { Page } from '../model/page/page.model';
import { Pageable } from '../model/page/pageable.model';


export class UploadRequest {
    static readonly type = '[Chart] UploadRequest';

    constructor(
        public payload: File,
        public request: UploadDataRequest
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

    constructor(public pageable: Pageable) { }
}

export class GetChartsResponse {
    static readonly type = '[Chart] GetChartsResponse';

    constructor(public response: Page) { }
}

export class DeleteChartByIdRequest {
    static readonly type = '[Chart] DeleteChartByIdRequest';

    constructor(public id: string) { }
}

export class DeleteChartByIdResponse {
    static readonly type = '[Chart] DeleteChartByIdResponse';

    constructor(public response: ChartData[]) { }
}
