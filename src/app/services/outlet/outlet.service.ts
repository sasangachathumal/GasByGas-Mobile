import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../storage/local-storage.service";

export interface Outlet {
  address: string;
  email: string;
  id: number;
  name: string;
  phone_no: string;
}

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  // API URL
  private endpoints = {
    getAll: '/outlet',
    getSchedule: '/schedule/outlet/'
  };

  // API request headers
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.localStorageService.get('access_token')}`,
    "ngrok-skip-browser-warning": "69420",
  });

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // GET request to load outlets
  getOutlets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${this.endpoints.getAll}`, { headers: this.httpHeaders });
  }

  // GET request to load outlets
  getScheduleByOutlet(outletId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}${this.endpoints.getSchedule}${outletId}`, { headers: this.httpHeaders });
  }
}
