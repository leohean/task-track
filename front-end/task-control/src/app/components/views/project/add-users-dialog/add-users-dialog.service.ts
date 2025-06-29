import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BasicUser } from '../../../../interfaces/basic-user';
import { AddUsersDialogComponent } from './add-users-dialog.component';

export interface AddUsersDialogData {
  projectId: number;
  currentUsers: BasicUser[];
}

export interface AddUsersDialogResult {
  addedUsers: BasicUser[];
}

@Injectable({
  providedIn: 'root'
})
export class AddUsersDialogService {

  constructor(private dialog: MatDialog) { }

  open(projectId: number, currentUsers: BasicUser[]): Observable<AddUsersDialogResult | undefined> {
    const dialogRef = this.dialog.open(AddUsersDialogComponent, {
      width: '600px',
      data: {
        projectId,
        currentUsers
      } as AddUsersDialogData,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
} 