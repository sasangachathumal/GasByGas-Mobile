import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../storage/local-storage.service";

export interface UserRequest {
  request: {
    id: number;
    schedule_id: number;
    gas_id: number;
    consumer_id: number;
    type: string;
    status: string;
    token: string;
    quantity: number;
    expired_at: string;
  };
  gas: {
    id: number;
    price: number;
    weight: string;
  };
  consumer: {
    id: number;
    user_id: number;
    nic: string;
    phone_no: string;
    type: string;
    business_no: string;
    status: string;
    email: string;
  };
  schedule: {
    id: number;
    outlet_id: number;
    status: string;
    schedule_date: string;
    max_quantity: number;
    available_quantity: number;
  };
  outlet: {
    id: number;
    email: string;
    name: string;
    address: string;
    phone_no: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // API URL
  private endpoints = {
    getAll: '/request',
    getByUser: '/request/user',
    create: '/request'
  };

  // API request headers
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.localStorageService.get('access_token')}`,
    "ngrok-skip-browser-warning": "69420",
  });

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // GET request to load user requests
  getRequestByUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${this.endpoints.getByUser}`, { headers: this.httpHeaders });
  }

  // POST request to create new gas request
  createNewRequest(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.endpoints.create}`, data, { headers: this.httpHeaders });
  }
}
