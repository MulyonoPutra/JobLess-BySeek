import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    LogoComponent
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent { }
