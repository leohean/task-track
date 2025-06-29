import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../../interfaces/task.interface';
import { environment } from '../../../../environments/environment';
import { Pageable } from '../../../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = environment.apiUrl + 'task';

  constructor(private http: HttpClient) { }

  create(userStoryId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${userStoryId}`, task);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
