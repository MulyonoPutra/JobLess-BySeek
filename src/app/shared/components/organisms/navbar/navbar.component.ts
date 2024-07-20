import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MENU_LANG } from '../../../../core/constants/dropdown-menu';
import { MENU_ITEM } from '../../../../core/constants/menu';
import { User } from '../../../../core/domain/entities/user';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { DropdownHeaderComponent } from '../../molecules/dropdown-header/dropdown-header.component';

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
export class NavbarComponent implements OnInit {
    @Input() user!: User;
    @Output() logout = new EventEmitter<void>();

    dropdownLangMenu = MENU_LANG;
    menuItems = MENU_ITEM;

    ngOnInit(): void {}

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
