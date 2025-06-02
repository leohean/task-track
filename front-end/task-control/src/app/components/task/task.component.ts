import { Component, EventEmitter, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { MaterialModule } from '../../shared/material.module';
import { TaskDetailsDialogService } from './task-details-dialog/task-details-dialog.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task: Task | null = null;

  constructor(private taskDetailsDialogService: TaskDetailsDialogService) { }

  getInitials(): string {
    const names = this.task?.responsibleUser?.name.split(' ') ?? [];
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  openTaskDetailsDialog() {
    if (this.task) {
      this.taskDetailsDialogService.open(this.task).subscribe();
    }
  }
}
