import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from '../model/chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  search() {
    return this.http.get<ChartData[]>(`http://localhost:8080/chart-data/search`);
  }

  delete(id: string) {
    const options = {
      headers: new HttpHeaders(),
      body: {}
    }
    return this.http.delete<ChartData[]>(`http://localhost:8080/chart-data/${id}/delete`, options)
  }

}
