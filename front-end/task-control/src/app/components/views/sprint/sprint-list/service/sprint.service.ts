import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sprint } from '../../../../../interfaces/sprint.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private baseUrl = environment.apiUrl + 'sprints';

  constructor(private http: HttpClient) { }

  create(sprint:Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.baseUrl}`, sprint);
  }

  get(projectId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.baseUrl}?projectId=${projectId}`);
  }

  getById(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.baseUrl}/${id}`);
  }

  update(id: number, sprint:Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.baseUrl}/${id}`, sprint);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
