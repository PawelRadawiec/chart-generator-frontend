import { ChartDataSets, ChartType } from 'chart.js';
import { DataSeriesType } from './data-series-type.model';

export class ChartData {
    id: string;
    chartDataSet: ChartDataSets[];
    lineChartLabels: string[];
    type: string;
    fileName: string;
    option: ChartDataSeriesOption;
}

export class ChartDataSeriesOption {
    chartType: ChartType;
    dataSeriesType: DataSeriesType;
}
