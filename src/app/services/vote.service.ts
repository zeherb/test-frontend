import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  voteUrl = environment.baseUrl + '/vote';

  constructor(private http: HttpClient) {}
  createVote(body: any): Observable<any> {
    return this.http.post(this.voteUrl + '/create', body);
  }
}
