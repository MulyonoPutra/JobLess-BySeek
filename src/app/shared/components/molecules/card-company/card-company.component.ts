import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-company',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  templateUrl: './card-company.component.html',
  styleUrls: ['./card-company.component.scss'],
})
export class CardCompanyComponent { }
