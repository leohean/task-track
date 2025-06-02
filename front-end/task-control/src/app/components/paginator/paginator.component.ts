import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() currentPageChange = new EventEmitter<number>();

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPageChange.emit(this.currentPage - 1);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPageChange.emit(this.currentPage + 1);
    }
  }
}
