import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-forms',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile-forms.component.html',
  styleUrls: ['./profile-forms.component.scss'],
})
export class ProfileFormsComponent implements OnInit {

  ngOnInit(): void { }

}
