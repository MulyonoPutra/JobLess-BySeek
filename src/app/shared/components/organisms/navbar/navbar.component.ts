import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { DropdownHeaderComponent } from '../../molecules/dropdown-header/dropdown-header.component';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { MENU_ITEM } from '../../../../core/constants/menu';
import { MENU_LANG } from '../../../../core/constants/dropdown-menu';
import { RouterModule } from '@angular/router';
import { User } from '../../../../core/domain/entities/user';

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
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Input() user!: User;
    @Output() logout = new EventEmitter<void>();

    dropdownLangMenu = MENU_LANG;
    menuItems = MENU_ITEM;

    isMenuItems = false;

    get firstName(): string {
        const [name] = this.user.name.split(' ');
        return name;
    }

    changeLanguage(): void {
        console.log('change language');
    }

    onLogout(): void {
        this.logout.emit();
    }
}
