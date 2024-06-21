import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/organisms/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/organisms/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    NavbarComponent,
    FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>
        <main id="content">
          <div class="max-w-[85rem] mx-auto pt-12 pb-10 px-4 sm:px-6 lg:px-8 md:pt-24">
            <router-outlet></router-outlet>
          </div>
        </main>
    <app-footer></app-footer>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class MainComponent { }
