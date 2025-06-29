import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserStory } from '../../../../../../interfaces/user-story.interface';
import { Observable } from 'rxjs';
import { Pageable } from '../../../../../../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  private baseUrl = environment.apiUrl + 'userstory';

  constructor(private http: HttpClient) { }

  get(sprintId: number, page: number): Observable<Pageable<UserStory>> {
    return this.http.get<Pageable<UserStory>>(`${this.baseUrl}/${sprintId}/userstories?page=${page}&size=1000`);
  }

  getById(id: number): Observable<UserStory> {
    return this.http.get<UserStory>(`${this.baseUrl}/${id}`);
  }

  update(id:number, userStories: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.baseUrl}/${id}`, userStories);
  }

  create(userStory: UserStory): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.baseUrl}/${userStory.sprintId}`, userStory);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
