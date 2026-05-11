import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface TableColumn {
  field: string;
  header: string;
}

export interface TableAction {
  label: string;
  icon: string;
  action: string;
  className?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];

  @Input() pageSize = 5;
  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Input() totalElements = 0;

  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = [5, 10, 20];

  onAction(action: string, row: any): void {
    this.actionClick.emit({ action, row });
  }

  trackByRow(index: number, row: any): any {
    return row?.id ?? row?.email ?? index;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(value);
  }
}