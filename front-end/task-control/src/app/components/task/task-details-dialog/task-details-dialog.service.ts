import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from '../../../interfaces/task.interface';
import { TaskDetailsDialogComponent } from './task-details-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsDialogService {

  constructor(private dialog: MatDialog) { }

  open(task: Task | null): Observable<void> {
    const dialogRef = this.dialog.open(TaskDetailsDialogComponent, {
      width: '1200px',
      data: { task }
    });

    return dialogRef.afterClosed();
  }
}
