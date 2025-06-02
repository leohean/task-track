import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectComponent } from './components/views/project/project.component';
import { SprintComponent } from './components/views/sprint/sprint-list/sprint.component';
import { SprintDetailsComponent } from './components/views/sprint/sprint-details/sprint-details.component';
import { LoginComponent } from './components/views/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'projects',
        component: ProjectComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'projects/:id/sprints',
        component: SprintComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'projects/:projectId/sprints/:sprintId',
        component: SprintDetailsComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
