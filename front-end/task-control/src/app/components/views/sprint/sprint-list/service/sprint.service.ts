import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sprint } from '../../../../../interfaces/sprint.interface';
import { Observable } from 'rxjs';
import { Pageable } from '../../../../../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private baseUrl = environment.apiUrl + 'sprint';

  constructor(private http: HttpClient) { }

  create(sprint:Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.baseUrl}/${sprint.projectId}`, sprint);
  }

  get(projectId: number, page: number): Observable<Pageable<Sprint>> {
    return this.http.get<Pageable<Sprint>>(`${this.baseUrl}/project/${projectId}?page=${page}&size=8`);
  }

  getById(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.baseUrl}/${id}`);
  }

  update(id: number, sprint:Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.baseUrl}/${id}`, sprint);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
