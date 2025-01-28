import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  // API URL
  private endpoints = {
    getAll: '/outlet'
  };

  // API request headers
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.localStorageService.get('access_token')}`
  });

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // GET request to load outlets
  getOutlets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${this.endpoints.getAll}`, {headers: this.httpHeaders});
  }
}
