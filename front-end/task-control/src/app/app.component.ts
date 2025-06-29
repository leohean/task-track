import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./components/template/header/header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/views/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task-control';
  isValidRoute = true;
  showResolutionWarning = false;
  currentResolution = '';

  private resizeListener: (() => void) | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.root;
        const lastChild = this.getLastChild(currentRoute);
        this.isValidRoute = !(lastChild.component === PageNotFoundComponent || lastChild.component === LoginComponent);
      }
    });
  }

  ngOnInit() {
    this.updateResolutionDisplay();
    this.checkResolutionWarning();
    
    // Atualizar quando a janela for redimensionada
    this.resizeListener = () => {
      this.updateResolutionDisplay();
      this.checkResolutionWarning();
    };
    
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  closeWarning() {
    this.showResolutionWarning = false;
  }

  private updateResolutionDisplay() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.currentResolution = `${width}x${height}`;
  }

  private checkResolutionWarning() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.showResolutionWarning = width < 1600 || height < 800;
  }

  private getLastChild(route: any): any {
    if (route.firstChild) {
      return this.getLastChild(route.firstChild);
    }
    return route;
  }
}
