import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BasicUser } from '../interfaces/basic-user';
import { ProjectUser } from '../interfaces/project-user.interface';
import { User } from '../interfaces/user.interface';
import { Role } from '../enums/role.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<BasicUser[]> {
    return this.http.get<ProjectUser[]>(`${this.apiUrl}user`).pipe(
      map(projectUsers => projectUsers.map(user => ({
        userId: user.id,
        userName: user.name,
        userEmail: user.email
      })))
    );
  }

  getUsersByProject(projectId: number): Observable<BasicUser[]> {
    return this.http.get<BasicUser[]>(`${this.apiUrl}/projectuser/project/${projectId}/users`);
  }

  getUsersByProjectAsUser(projectId: number): Observable<User[]> {
    return this.getUsersByProject(projectId).pipe(
      map(basicUsers => basicUsers.map(user => ({
        id: user.userId,
        name: user.userName,
        email: user.userEmail,
        username: user.userEmail,
        role: Role.USER, // Valor padrão, pode ser ajustado conforme necessário
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true
      })))
    );
  }

  addUsersToProject(projectId: number, userIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/projectuser/project/${projectId}/users`, { userIds });
  }

  removeUsersFromProject(projectId: number, userIds: number[]): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projectuser/project/${projectId}/users`, { 
      body: { userIds } 
    });
  }
} 