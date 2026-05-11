import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService)

  user: any | null = null;

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response) => {
        this.user = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      },
    });
  }

  getRoleLabel(): string {
  return this.translateService.currentLang === 'en'
    ? this.user?.roleLabelEn
    : this.user?.roleLabelFr;
}

getStatusLabel(): string {
  return this.translateService.currentLang === 'en'
    ? this.user?.statusLabelEn
    : this.user?.statusLabelFr;
}

}