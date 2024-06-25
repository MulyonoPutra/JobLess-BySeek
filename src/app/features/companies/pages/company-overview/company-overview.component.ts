import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-company-overview',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyOverviewComponent implements OnInit {

  ngOnInit(): void { }

}
