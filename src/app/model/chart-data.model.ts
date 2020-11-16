import { ChartDataSets } from 'chart.js';

export class ChartData {
    id: string;
    chartDataSet: ChartDataSets[];
    lineChartLabels: string[];
    type: string;
    fileName: string;
}
