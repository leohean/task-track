import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from '../../../interfaces/task.interface';
import { TaskDetailsDialogComponent } from './task-details-dialog.component';
import { TaskStatus } from '../../../enums/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsDialogService {

  constructor(private dialog: MatDialog) { }

  open(userStoryId: number, task: Task | null, selectedStatus: TaskStatus | null): Observable<Task | undefined> {
    const dialogRef = this.dialog.open(TaskDetailsDialogComponent, {
      width: '1200px',
      data: { 
        userStoryId,
        task,
        selectedStatus 
      }
    });

    return dialogRef.afterClosed();
  }
}
