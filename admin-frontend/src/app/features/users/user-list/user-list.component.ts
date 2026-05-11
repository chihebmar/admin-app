import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import {
  DataTableComponent,
  TableAction,
  TableColumn,
} from '../../../shared/components/data-table/data-table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { AppModalComponent } from '../../../shared/components/app-modal/app-modal.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    DataTableComponent,
    SearchBarComponent,
    TranslatePipe,
    AppModalComponent,
    UserFormComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService);

  get columns(): TableColumn[] {
    const isEnglish = this.translateService.currentLang === 'en';

    return [
      { field: 'firstName', header: 'TABLE.FIRSTNAME' },
      { field: 'lastName', header: 'TABLE.LASTNAME' },
      { field: 'email', header: 'TABLE.EMAIL' },
      {
        field: isEnglish ? 'roleLabelEn' : 'roleLabelFr',
        header: 'TABLE.ROLE',
      },
      {
        field: isEnglish ? 'statusLabelEn' : 'statusLabelFr',
        header: 'TABLE.STATUS',
      },
    ];
  }

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

  users: any[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;

  selectedUser: any | null = null;
  userToDelete: any | null = null;

  modalMode: 'add' | 'edit' | 'view' = 'add';
  showUserModal = false;
  showDeleteModal = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
      .getUsersPage(this.currentPage - 1, this.pageSize)
      .subscribe({
        next: (response) => {
          this.users = [...response.content];
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.currentPage = response.number + 1;
          this.pageSize = response.size;

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading users:', error);
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadUsers();
  }

  onSearch(term: string): void {
    console.log('Search later with backend:', term);
  }

  onAddUser(): void {
    this.modalMode = 'add';
    this.selectedUser = null;
    this.showUserModal = true;
  }

  onAction(event: { action: string; row: any }): void {
    if (event.action === 'view') {
      this.modalMode = 'view';
      this.selectedUser = event.row;
      this.showUserModal = true;
    }

    if (event.action === 'edit') {
      this.modalMode = 'edit';
      this.selectedUser = event.row;
      this.showUserModal = true;
    }

    if (event.action === 'delete') {
      this.userToDelete = event.row;
      this.showDeleteModal = true;
    }
  }

  handleUserCreate(user: any): void {
    if (this.modalMode === 'add') {
      this.userService.createUser(user).subscribe({
        next: () => {
          this.closeUserModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error creating user:', error);
        },
      });
    }

    if (this.modalMode === 'edit' && this.selectedUser?.id) {
      this.userService.updateUser(this.selectedUser.id, user).subscribe({
        next: () => {
          this.closeUserModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    }
  }

  confirmDelete(): void {
    if (!this.userToDelete?.id) {
      return;
    }

    this.userService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }

  closeUserModal(): void {
    this.showUserModal = false;
    this.selectedUser = null;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }
}