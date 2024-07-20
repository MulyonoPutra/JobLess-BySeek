import { Component, DestroyRef, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { AuthenticationService } from '../../../features/authentication/services/authentication.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/organisms/footer/footer.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/components/organisms/navbar/navbar.component';
import { StorageService } from '../../services/storage.service';
import { User } from '../../domain/entities/user';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
    template: `
        <app-navbar [user]="user" (logout)="logout()"></app-navbar>
        <main>
            <div
                [ngClass]="{
                    'max-w-[55rem]': !isFullWidthRoute,
                    'max-w-[85rem]': isFullWidthRoute,
                }"
                class="mx-auto pt-4 pb-10 px-4 sm:px-6 lg:px-8 md:pt-32">
                <router-outlet></router-outlet>
            </div>
        </main>
        <app-footer></app-footer>
    `,
    providers: [UserService],
})
export class MainComponent implements OnInit {
    private currentRoute!: string;
    private fullWidthRoutes: string[] = ['/company', '/profile', '/jobs', '/jobs/views'];
    user!: User;

    constructor(
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly userService: UserService,
        private readonly storageService: StorageService,
        private readonly authService: AuthenticationService,
    ) {
        this.trackRouteChanges();
    }

    ngOnInit(): void {
        this.findUser();
    }

    trackRouteChanges(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.urlAfterRedirects;
            }
        });
    }

    findUser(): void {
        this.userService
            .findUser()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (user: User) => {
                    this.user = user;
                    this.storageService.setSeekerIdentity(this.user.seeker?.id!);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error.message);
                },
                complete: () => {},
            });
    }

    get isFullWidthRoute(): boolean {
        return this.fullWidthRoutes.includes(this.currentRoute);
    }

    logout(): void {
        const token = this.storageService.getAccessToken();
        this.authService.logout(token).subscribe({
            next: () => {
                // TODO: Show success message toast here
            },
            error: (error: HttpErrorResponse) => {
                console.error(error.message);
            },
            complete: () => {
                this.router.navigateByUrl('/auth/login').then(() => window.location.reload());
            },
        });
    }
}
