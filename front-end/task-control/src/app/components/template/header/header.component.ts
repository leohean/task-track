import { Component, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AddUsersDialogService } from '../../views/project/add-users-dialog/add-users-dialog.service';
import { UserService } from '../../../services/user.service';
import { BasicUser } from '../../../interfaces/basic-user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  username: string = '';
  pageTitle: string = 'Projetos';
  breadcrumbs: Array<{label: string, url: string, active: boolean}> = [];
  private routerSubscription: Subscription;
  
  constructor (private authSerivce: AuthService,
               private router: Router,
               private addUsersDialogService: AddUsersDialogService,
               private userService: UserService
  ) {
    // Escutar mudanças na navegação
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
      this.updateBreadcrumbs();
    });
  }

  ngOnInit() {
    const payload = this.authSerivce.decodeToken(this.authSerivce.getToken() ?? "");
    if (payload) {
      this.username = payload["name"];
    }
    
    // Atualizar o título inicial
    this.updatePageTitle();
    this.updateBreadcrumbs();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  openAddUsersDialog() {
    const projectId = parseInt(this.extractProjectId(this.router.url));
    
    if (projectId) {
      this.userService.getUsersByProject(projectId).subscribe({
        next: (currentUsers) => {
          this.addUsersDialogService.open(projectId, currentUsers).subscribe(result => {
            if (result) {
              console.log('Usuários adicionados:', result.addedUsers);
            }
          });
        }
      });
    }
  }

  updateBreadcrumbs() {
    const url = this.router.url;
    this.breadcrumbs = [];

    // Página inicial
    if (url === '/' || url === '/projects') {
      this.breadcrumbs = [
        { label: 'Projetos', url: '/', active: true }
      ];
    } 
    // Lista de sprints
    else if (url.includes('/projects/') && url.includes('/sprints') && !url.includes('/sprints/')) {
      const projectId = this.extractProjectId(url);
      this.breadcrumbs = [
        { label: 'Projetos', url: '/', active: false },
        { label: 'Sprints', url: `/projects/${projectId}/sprints`, active: true }
      ];
    } 
    // Detalhes do sprint
    else if (url.includes('/projects/') && url.includes('/sprints/')) {
      const projectId = this.extractProjectId(url);
      const sprintId = this.extractSprintId(url);
      this.breadcrumbs = [
        { label: 'Projetos', url: '/', active: false },
        { label: 'Sprints', url: `/projects/${projectId}/sprints`, active: false },
        { label: 'Detalhes do Sprint', url: `/projects/${projectId}/sprints/${sprintId}`, active: true }
      ];
    } 
    // Login
    else if (url === '/login') {
      this.breadcrumbs = [
        { label: 'Login', url: '/login', active: true }
      ];
    } 
    // Página não encontrada
    else if (url === '/**') {
      this.breadcrumbs = [
        { label: 'Página não encontrada', url: '/**', active: true }
      ];
    }
  }

  private extractProjectId(url: string): string {
    const match = url.match(/\/projects\/(\d+)/);
    return match ? match[1] : '';
  }

  private extractSprintId(url: string): string {
    const match = url.match(/\/sprints\/(\d+)/);
    return match ? match[1] : '';
  }

  updatePageTitle() {
    const url = this.router.url;
    
    if (url === '/' || url === '/projects') {
      this.pageTitle = 'Projetos';
    } else if (url.includes('/projects/') && url.includes('/sprints') && !url.includes('/sprints/')) {
      this.pageTitle = 'Sprints';
    } else if (url.includes('/projects/') && url.includes('/sprints/')) {
      this.pageTitle = 'Detalhes do Sprint';
    } else if (url === '/login') {
      this.pageTitle = 'Login';
    } else if (url === '/**') {
      this.pageTitle = 'Página não encontrada';
    } else {
      this.pageTitle = 'Task Track';
    }
  }

  getInitials(): string {
    const names = this.username.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  logout(): void {
    this.authSerivce.removeTokens();
    this.router.navigate(['/login']);
  }
}
