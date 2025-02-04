import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API URL
  private endpoints = {
    login: '/login',
    logout: '/logout',
    forgetPass: '/forgot-password',
    me: '/me'
  };

  // API request headers
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.localStorageService.get('access_token')}`,
    "ngrok-skip-browser-warning": "69420",
  });

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // POST request to log user in
  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.endpoints.login}`, data);
  }

  // GET request to user details
  me(token: any): Observable<any> {
    const newHttpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    });
    return this.http.get(`${environment.apiUrl}${this.endpoints.me}`, { headers: newHttpHeaders });
  }

  // POST request to logout the user
  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.endpoints.logout}`, {}, { headers: this.httpHeaders });
  }
  // POST request to send reset password link
  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.endpoints.forgetPass}`, data, { headers: this.httpHeaders });
  }
}
