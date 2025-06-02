import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../../../../interfaces/project.interface';
import { CreateProjectDialogComponent } from './create-project-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectDialogService {
  constructor(private dialog: MatDialog) { }

  openCreateDialog(): Observable<Project | undefined> {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '500px'
    });

    return dialogRef.afterClosed();
  }

  openEditDialog(project: Project): Observable<Project | undefined> {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '500px',
      data: { projectId: project.id }
    });

    return dialogRef.afterClosed();
  }
} 