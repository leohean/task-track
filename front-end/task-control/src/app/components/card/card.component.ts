import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MaterialModule,
    DatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() createdBy: string = '';
  @Input() createdAt: Date = new Date();

  @Input() showViewButton: boolean = true;
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;

  @Output() onViewClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();
  @Output() onCardClick = new EventEmitter<void>();
}
