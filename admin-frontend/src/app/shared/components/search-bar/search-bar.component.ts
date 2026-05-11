import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() placeholder = 'Search...';
  @Output() searchChange = new EventEmitter<string>();

  value = '';

  onSearchChange() {
    this.searchChange.emit(this.value);
  }

  clearSearch() {
    this.value = '';
    this.searchChange.emit('');
  }
}