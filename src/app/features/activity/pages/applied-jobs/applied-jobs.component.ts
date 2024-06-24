import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { CardActivityComponent } from '../../../../shared/components/molecules/card-activity/card-activity.component';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [
    CommonModule,
    CardActivityComponent
  ],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit {


  isLoading = false;

  ngOnInit(): void { }

  applied(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.isLoading = true;
  }

  onRemove(): void {
    console.log('removed');
  }

}
