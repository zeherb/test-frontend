import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.baseUrl + '/user';

  constructor(private http: HttpClient) {}
  getById(id: any): Observable<any> {
    return this.http.get(this.userUrl + '/get/' + id);
  }
}
