import { ChartType } from '../components/upload/upload.component';
import { DataSeriesType } from './data-series-type.model';

export class UploadDataRequest {
    type: ChartType;
    dataSeriesType: DataSeriesType;
}

