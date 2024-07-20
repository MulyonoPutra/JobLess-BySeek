import { Component, DestroyRef } from '@angular/core';
import { take, timer } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { BadgeComponent } from '../../../../shared/components/atoms/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { CreateSkillDto } from '../../../../core/domain/dto/create-skill.dto';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { InputSkillFormComponent } from '../../../../shared/components/molecules/input-skill-form/input-skill-form.component';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { Skill } from '../../../../core/domain/entities/skill';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-skills-form',
    standalone: true,
    imports: [
        CommonModule,
        BadgeComponent,
        AngularSvgIconModule,
        ButtonComponent,
        InputSkillFormComponent,
        ChipModule,
    ],
    templateUrl: './skills-form.component.html',
    styleUrls: ['./skills-form.component.scss'],
})
export class SkillsFormComponent {
    value: string = '';
    skillInput: CreateSkillDto[] = [];
    skills!: Skill[];
    seekerId!: string;
    isLoading!: boolean;

    constructor(
        private readonly profileService: ProfileService,
        private readonly storageService: StorageService,
        private readonly toastService: ToastService,
        private readonly router: Router,
        private readonly dialogConfig: DynamicDialogConfig,
        private readonly destroyRef: DestroyRef,
    ) {
        this.seekerId = this.storageService.getSeekerIdentity();
        this.skills = this.dialogConfig.data.skills;
    }

    search(data: string): void {
        this.skillInput.push({ name: data });
    }

    addSkills(): void {
        const trimmedValue = this.value.trim();
        if (trimmedValue) {
            this.skillInput.push({
                seekerId: this.seekerId,
                name: trimmedValue,
            });
            this.value = '';
        }
    }

    removeSkill(chip: { name: string }): void {
        this.skillInput = this.skillInput.filter((c) => c !== chip);
    }

    onEnterKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addSkills();
        }
    }

    onSubmitToServer(): void {
        this.profileService
            .createSkills(this.seekerId, this.skillInput)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Created Skills...');
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 2000);
                },
                error: (error: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    removeSkillById(id: string): void {
        this.profileService
            .removeSkillById(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (removed) => {
                    this.toastService.showSuccessToast('Success', `Removed ${removed.name}`);
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
            });
    }

    navigateAfterSucceed(): void {
        timer(3000)
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigateByUrl('/profile').then(() => {
                    window.location.reload();
                });
            });
    }
}
