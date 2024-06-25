import { CardCompanyComponent } from '../../../../shared/components/molecules/card-company/card-company.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { Router } from '@angular/router';
import { SearchFieldComponent } from '../../../../shared/components/molecules/search-field/search-field.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    SearchFieldComponent,
    CardCompanyComponent,
    OverlayImageContainerComponent
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  overlayImage = 'https://res.cloudinary.com/damu971dt/image/upload/v1718958396/Projects/alex-kotliarskyi-QBpZGqEMsKg-unsplash_hv7ltq.jpg';

  constructor(private readonly router: Router){}

  onDetails(id: string): void {
    this.router.navigateByUrl(`/company/details/${id}`)
  }
}
