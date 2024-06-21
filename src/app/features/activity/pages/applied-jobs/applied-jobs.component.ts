import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit {

  ngOnInit(): void { }

}
