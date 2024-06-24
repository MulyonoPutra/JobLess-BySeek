import { Component, Input } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay-image-container',
  standalone: true,
  imports: [
    CommonModule, AngularSvgIconModule
  ],
  templateUrl: './overlay-image-container.component.html',
  styleUrls: ['./overlay-image-container.component.scss'],
})
export class OverlayImageContainerComponent {
  @Input() overlayImage!: string;
}
