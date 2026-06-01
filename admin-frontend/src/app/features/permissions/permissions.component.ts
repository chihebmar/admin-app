import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ReferentielSelectComponent } from '../../shared/components/referentiel-select/referentiel-select.component';
import { RoleInterfaceService } from '../../core/services/role-interface.service';
import { ReferentielService, ReferentielResponse } from '../../core/services/referentiel.service';
import { TranslateService } from '@ngx-translate/core';

interface PermissionInterfaceItem {
  codeRef: string;
  labelFr: string;
  labelEn: string;
}

@Component({
  selector: 'app-permission-management',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, ReferentielSelectComponent],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
})
export class PermissionManagementComponent {
  private roleInterfaceService = inject(RoleInterfaceService);
  private cdr = inject(ChangeDetectorRef);
  private referentielService = inject(ReferentielService);
  private translateService = inject(TranslateService);

  selectedRole = '';
  selectedInterfaces: string[] = [];
  saved = false;

  interfaces: PermissionInterfaceItem[] = [];

  ngOnInit(): void {
  this.loadInterfaces();
}

loadInterfaces(): void {
  this.referentielService.getByType('INTERFACE').subscribe({
    next: (data: ReferentielResponse[]) => {
      this.interfaces = data.map(item => ({
        codeRef: item.codeRef,
        labelFr: item.labelFr,
        labelEn: item.labelEn,
      }));

      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error loading interfaces:', error);
    },
  });
}

getInterfaceLabel(item: PermissionInterfaceItem): string {
  return this.translateService.currentLang === 'en'
    ? item.labelEn
    : item.labelFr;
}


  onRoleChange(roleCodeRef: string): void {
    this.selectedRole = roleCodeRef;
    this.saved = false;

    if (!roleCodeRef) {
      this.selectedInterfaces = [];
      return;
    }

    this.roleInterfaceService.getInterfacesByRole(roleCodeRef).subscribe({
      next: (codes) => {
        this.selectedInterfaces = [...codes];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading role interfaces:', error);
      },
    });
  }

  isChecked(codeRef: string): boolean {
    return this.selectedInterfaces.includes(codeRef);
  }

  toggleInterface(codeRef: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedInterfaces = [...this.selectedInterfaces, codeRef];
    } else {
      this.selectedInterfaces = this.selectedInterfaces.filter(
        (item) => item !== codeRef
      );
    }

    this.saved = false;
  }

  save(): void {
    if (!this.selectedRole) {
      return;
    }

    this.roleInterfaceService
      .updateRoleInterfaces(this.selectedRole, this.selectedInterfaces)
      .subscribe({
        next: (codes) => {
          this.selectedInterfaces = [...codes];
          this.saved = true;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error saving permissions:', error);
        },
      });
  }
}