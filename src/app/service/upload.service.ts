import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ChartData } from '../model/chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ChartData>(`${this.baseUrl}/upload`, formData, { reportProgress: true, responseType: 'json' });
  }

}
