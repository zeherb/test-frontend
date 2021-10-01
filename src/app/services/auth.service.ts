import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = environment.baseUrl + '/auth';

  constructor(private http: HttpClient) {}
  rigister(body: any): Observable<any> {
    return this.http.post(this.authUrl + '/register', body);
  }
  login(body: any): Observable<any> {
    return this.http.post(this.authUrl + '/login', body);
  }
}
