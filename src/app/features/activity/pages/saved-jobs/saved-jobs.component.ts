import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { CardActivityComponent } from '../../../../shared/components/molecules/card-activity/card-activity.component';

@Component({
  selector: 'app-saved-jobs',
  standalone: true,
  imports: [
    CommonModule,
    CardActivityComponent
  ],
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss'],
})
export class SavedJobsComponent implements OnInit {

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
