import { Component, OnInit } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ButtonComponent
  ],
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  isLoading = false;

  ngOnInit(): void { }

  applied(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.isLoading = true;
  }

  onClick(): void {
    console.log('removed');
  }
}
