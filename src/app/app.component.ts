import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { take, timer } from 'rxjs';

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

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.showSpinner();
  }

  ngOnInit() {
    this.prelineInit();
    this.scrollToTop();
  }

  prelineInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  scrollToTop() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
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
