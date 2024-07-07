import { Component, Input } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { BadgeComponent } from '../../../../shared/components/atoms/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from '../../../../shared/components/molecules/search-field/search-field.component';
import { Skill } from '../../../../core/domain/entities/skill';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [
    CommonModule, BadgeComponent, AngularSvgIconModule, ButtonComponent, SearchFieldComponent
  ],
  templateUrl: './skills-form.component.html',
  styleUrls: [ './skills-form.component.scss' ],
})
export class SkillsFormComponent {


}
