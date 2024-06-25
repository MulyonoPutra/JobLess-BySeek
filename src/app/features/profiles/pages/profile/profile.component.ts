import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardProfileComponent } from '../../../../shared/components/molecules/card-profile/card-profile.component';
import { SectionHeaderProfileComponent } from '../../../../shared/components/molecules/section-header-profile/section-header-profile.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { CardSummaryComponent } from '../../../../shared/components/molecules/card-summary/card-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    CardProfileComponent,
    SectionHeaderProfileComponent,
    OverlayImageContainerComponent,
    CardSummaryComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  overlayImage = 'https://res.cloudinary.com/damu971dt/image/upload/v1718977514/Projects/christina-wocintechchat-com-UTw3j_aoIKM-unsplash_ck21qn.jpg';

  constructor(private readonly router: Router) { }

  ngOnInit(): void { }
  details = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ';

  onEdit(id: string): void {
    console.log(id)
  }

  onUpdateSummary(id: string): void {
    this.router.navigateByUrl(`/profile/forms/${id}`)
  }

  onCreateExperience(): void {
    console.log('create new experience');
  }

  onCreateEducation(): void { }

}
