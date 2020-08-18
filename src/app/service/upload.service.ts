import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { ChartData } from '../model/chart-data.model';
import { ChartType } from '../components/upload/upload.component';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  upload(file: File, chartType: ChartType) {
    const formData: FormData = new FormData();
    const params = new HttpParams().set('type', chartType);
    formData.append('file', file);
    return this.http.post<ChartData>(`${this.baseUrl}/upload`, formData, { reportProgress: true, responseType: 'json', params });
  }

}
