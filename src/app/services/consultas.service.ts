import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  url:string = "http://127.0.0.1:3000";
  //url:string = "https://corebackend.onrender.com";


  getAverageCpuUsage(serverId: string, startDate: string, endDate: string): Observable<any> {
    const params = { server_id: serverId, start_date: startDate, end_date: endDate };
    return this.http.get(this.url+'/api/v1/uso_cpu_promedio', { params });
  }

}
