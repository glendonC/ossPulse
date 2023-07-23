import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService {
  private contributorsUrl = 'http://localhost:5000/api/contributors';

  constructor(private http: HttpClient) { }

  getContributors(): Observable<any> {
    return this.http.get<any>(this.contributorsUrl);
  }

  
}
