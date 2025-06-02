import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserStory } from '../../../../../../interfaces/user-story.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  private baseUrl = environment.apiUrl + 'userStories';

  constructor(private http: HttpClient) { }

  get(sprintId: number): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(`${this.baseUrl}?sprintId=${sprintId}`);
  }

  update(id:number, userStories: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.baseUrl}/${id}`, userStories);
  }
}
