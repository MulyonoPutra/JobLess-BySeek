import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { take, timer } from 'rxjs';

import { CommonModule } from '@angular/common';
import { IStaticMethods } from 'preline/preline';
import { LoadingIndicatorComponent } from './shared/components/atoms/loading-indicator/loading-indicator.component';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'jobless-by-seek';
  loadingIndicator!: boolean;

  constructor(private router: Router) {
    this.showSpinner();
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  showSpinner(): void {
    this.router.events.subscribe((routeEvent: Event) => {
      if (routeEvent instanceof NavigationStart) {
        this.loadingIndicator = true;
      }

      if (routeEvent instanceof NavigationEnd) {
        this.delay();
      }

      if (
        routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationError ||
        routeEvent instanceof NavigationCancel
      ) {
        this.delay();
      }
    });
  }

  delay(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => {
        this.loadingIndicator = false;
      });
  }
}
