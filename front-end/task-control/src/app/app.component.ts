import { Component } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./components/template/header/header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/views/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-control';
  isValidRoute = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.root;
        const lastChild = this.getLastChild(currentRoute);
        this.isValidRoute = !(lastChild.component === PageNotFoundComponent || lastChild.component === LoginComponent);
      }
    });
  }

  private getLastChild(route: any): any {
    if (route.firstChild) {
      return this.getLastChild(route.firstChild);
    }
    return route;
  }
}
