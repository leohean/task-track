import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../../interfaces/project.interface';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../../../../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.apiUrl + 'project';

  constructor(private http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}`, project);
  }

  get(page: number): Observable<Pageable<Project>> {
    return this.http.get<Pageable<Project>>(`${this.baseUrl}?page=${page}&size=8`);
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
