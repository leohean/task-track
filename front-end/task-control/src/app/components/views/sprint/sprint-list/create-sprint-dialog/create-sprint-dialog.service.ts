import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Sprint } from '../../../../../interfaces/sprint.interface';
import { CreateSprintDialogComponent } from './create-sprint-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CreateSprintDialogService {

  constructor(private dialog: MatDialog) { }

  openCreateDialog(projectId: number): Observable<Sprint | undefined> {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '500px',
      data: { projectId: projectId }
    });

    return dialogRef.afterClosed();
  }

  openEditDialog(projectId: number, sprint: Sprint): Observable<Sprint | undefined> {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '500px',
      data: { projectId: projectId, sprintId: sprint.id }
    });

    return dialogRef.afterClosed();
  }
}
