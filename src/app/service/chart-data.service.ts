import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from '../model/chart-data.model';
import { Page } from '../model/page/page.model';
@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  search(pageable) {
    return this.http.get<Page>(`http://localhost:8080/chart-data/search`, { params: pageable });
  }

  delete(id: string) {
    const options = {
      headers: new HttpHeaders(),
      body: {}
    }
    return this.http.delete<ChartData[]>(`http://localhost:8080/chart-data/${id}/delete`, options)
  }

}
