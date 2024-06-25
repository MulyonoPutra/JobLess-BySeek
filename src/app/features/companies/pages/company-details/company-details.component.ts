import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
	selector: 'app-company-details',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule, RouterOutlet, RouterModule],
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
	ngOnInit(): void {}
}
