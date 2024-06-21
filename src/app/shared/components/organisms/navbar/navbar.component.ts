import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, type OnInit } from '@angular/core';
import { DropdownHeaderComponent } from '../../molecules/dropdown-header/dropdown-header.component';
import { MENU_ITEM } from '../../../../core/constants/menu';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';
import { MENU_LANG } from '../../../../core/constants/dropdown-menu';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    DropdownHeaderComponent,
    LogoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  dropdownLangMenu = MENU_LANG;
  menuItems = MENU_ITEM;

  ngOnInit(): void { }

}
