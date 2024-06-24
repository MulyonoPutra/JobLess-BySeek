import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardProfileComponent } from '../../../../shared/components/molecules/card-profile/card-profile.component';
import { SectionHeaderProfileComponent } from '../../../../shared/components/molecules/section-header-profile/section-header-profile.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    CardProfileComponent,
    SectionHeaderProfileComponent,
    OverlayImageContainerComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  overlayImage = 'https://res.cloudinary.com/damu971dt/image/upload/v1718977514/Projects/christina-wocintechchat-com-UTw3j_aoIKM-unsplash_ck21qn.jpg';

  ngOnInit(): void { }
    details = 'A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. ... Regardless of the kind of information they contain, all paragraphs share certain characteristics. A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. ... Regardless of the kind of information they contain, all paragraphs share certain characteristics.A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writingo ju um y y y y kghg gg knnig jng ';

  onEdit(id: string): void {
    console.log(id)
  }

  onCreateExperience(): void {
    console.log('create new experience');
  }

}
