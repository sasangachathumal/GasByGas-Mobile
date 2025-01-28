import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../storage/local-storage.service";

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
    Authorization: `Bearer ${this.localStorageService.get('access_token')}`
  });

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // GET request to load user requests
  getRequestByUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${this.endpoints.getAll}`, {headers: this.httpHeaders});
  }

  // POST request to create new gas request
  createNewRequest(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.endpoints.create}`, data, {headers: this.httpHeaders});
  }
}
