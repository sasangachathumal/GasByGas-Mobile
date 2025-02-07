import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../storage/local-storage.service";

export interface GasType {
  id:number;
  price:string;
  weight: string;
}

@Injectable({
  providedIn: 'root'
})
export class GasService {

  // API URL
  private endpoints = {
    getAll: '/gas'
  };

  // API request headers
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.localStorageService.get('access_token')}`,
    "ngrok-skip-browser-warning": "69420",
  });

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // GET request to load gas types
  getGasTypes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${this.endpoints.getAll}`, {headers: this.httpHeaders});
  }
}
