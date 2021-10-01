import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  subjectUrl = environment.baseUrl + '/subject';

  constructor(private http: HttpClient) {}
  create(body: any): Observable<any> {
    return this.http.post(this.subjectUrl + '/create', body);
  }
  getAll(): Observable<any> {
    return this.http.get(this.subjectUrl + '/getall');
  }
}
