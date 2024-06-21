import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    AngularSvgIconModule
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  ngOnInit(): void { }

}
