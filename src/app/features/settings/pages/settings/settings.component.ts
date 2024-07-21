import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StorageService } from '../../../../core/services/storage.service';
import { CardSettingsComponent } from '../../../../shared/components/molecules/card-settings/card-settings.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProfileService } from '../../../profiles/services/profile.service';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, CardSettingsComponent, DynamicDialogModule,
    ConfirmDialogModule,],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [ProfileService, DialogService, ConfirmationService],
})
export class SettingsComponent implements OnInit {

  seekerId!: string;
  ref: DynamicDialogRef | undefined;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly profileService: ProfileService,
    private readonly storageService: StorageService,
    private readonly toastService: ToastService,
    public dialogService: DialogService,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.seekerId = this.storageService.getSeekerIdentity();
  }


  ngOnInit(): void { }

  openChangePasswordDialog(): void {
    this.ref = this.dialogService.open(ChangePasswordDialogComponent, {
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  deleteConfirmation(): void {
    this.confirmationService.confirm({
      header: 'Remove Work History',
      message: 'Are you sure want to remove this work history?',
      accept: () => {
        this.toastService.showSuccessToast('Unfortunately', 'Removed Account...');
      },
      reject: () => {
        console.log('cancelled!')
      }
    });
  }
}
