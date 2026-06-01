import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import {
  DataTableComponent,
  TableAction,
  TableColumn,
} from '../../../shared/components/data-table/data-table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { AppModalComponent } from '../../../shared/components/app-modal/app-modal.component';
import { PartnerFormComponent } from '../partner-form/partner-form.component';
import {
  PartnerResponse,
  PartnerService,
} from '../../../core/services/partner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    PageHeaderComponent,
    DataTableComponent,
    SearchBarComponent,
    AppModalComponent,
    PartnerFormComponent,
  ],
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.scss',
})
export class PartnerListComponent {
  private partnerService = inject(PartnerService);
  private translateService = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

partnerTypeCodeRef = 'PARTNER_TYPE_CLIENT';
  partners: PartnerResponse[] = [];

  selectedPartner: PartnerResponse | null = null;
  partnerToDelete: PartnerResponse | null = null;

  modalMode: 'add' | 'edit' | 'view' = 'add';
  showPartnerModal = false;
  showDeleteModal = false;

  actions: TableAction[] = [
    {
      label: 'View',
      icon: 'pi pi-eye',
      action: 'view',
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      action: 'edit',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      action: 'delete',
      className: 'danger',
    },
  ];

  get columns(): TableColumn[] {
    const isEnglish = this.translateService.currentLang === 'en';

    return [
      { field: 'code', header: 'PARTNERS.CODE' },
      { field: 'name', header: 'PARTNERS.NAME' },
      { field: 'email', header: 'PARTNERS.EMAIL' },
      { field: 'phone', header: 'PARTNERS.PHONE' },
      {
        field: isEnglish ? 'statusLabelEn' : 'statusLabelFr',
        header: 'PARTNERS.STATUS',
      },
    ];
  }

  get titleKey(): string {
    return this.partnerTypeCodeRef === 'PARTNER_TYPE_SUPPLIER'
      ? 'SUPPLIERS.TITLE'
      : 'CLIENTS.TITLE';
  }

  get subtitleKey(): string {
    return this.partnerTypeCodeRef === 'PARTNER_TYPE_SUPPLIER'
      ? 'SUPPLIERS.SUBTITLE'
      : 'CLIENTS.SUBTITLE';
  }

  get addButtonKey(): string {
    return this.partnerTypeCodeRef === 'PARTNER_TYPE_SUPPLIER'
      ? 'SUPPLIERS.ADD'
      : 'CLIENTS.ADD';
  }

ngOnInit(): void {
  this.partnerTypeCodeRef =
    this.route.snapshot.data['partnerTypeCodeRef'];

  this.loadPartners();
}

  loadPartners(): void {
    this.partnerService.getPartners(this.partnerTypeCodeRef).subscribe({
      next: (data) => {
        this.partners = [...data];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading partners:', error);
      },
    });
  }

  onSearch(term: string): void {
    console.log('Search later:', term);
  }

  onAddPartner(): void {
    this.modalMode = 'add';
    this.selectedPartner = null;
    this.showPartnerModal = true;
  }

  onAction(event: { action: string; row: PartnerResponse }): void {
    if (event.action === 'view') {
      this.modalMode = 'view';
      this.selectedPartner = event.row;
      this.showPartnerModal = true;
    }

    if (event.action === 'edit') {
      this.modalMode = 'edit';
      this.selectedPartner = event.row;
      this.showPartnerModal = true;
    }

    if (event.action === 'delete') {
      this.partnerToDelete = event.row;
      this.showDeleteModal = true;
    }
  }

  handlePartnerSubmit(request: any): void {
    request.typeCodeRef = this.partnerTypeCodeRef;

    if (this.modalMode === 'add') {
      this.partnerService.createPartner(request).subscribe({
        next: () => {
          this.closePartnerModal();
          this.loadPartners();
        },
        error: (error) => {
          console.error('Error creating partner:', error);
        },
      });
    }

    if (this.modalMode === 'edit' && this.selectedPartner?.id) {
      this.partnerService.updatePartner(this.selectedPartner.id, request).subscribe({
        next: () => {
          this.closePartnerModal();
          this.loadPartners();
        },
        error: (error) => {
          console.error('Error updating partner:', error);
        },
      });
    }
  }

  confirmDelete(): void {
    if (!this.partnerToDelete?.id) {
      return;
    }

    this.partnerService.deletePartner(this.partnerToDelete.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadPartners();
      },
      error: (error) => {
        console.error('Error deleting partner:', error);
      },
    });
  }

  closePartnerModal(): void {
    this.showPartnerModal = false;
    this.selectedPartner = null;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.partnerToDelete = null;
  }
}