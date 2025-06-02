import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserStory } from '../../../../../../interfaces/user-story.interface';
import { Observable } from 'rxjs';
import { CreateUserStoryDialogComponent } from './create-user-story-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CreateUserStoryDialogService {

  constructor(private dialog: MatDialog) { }

  openCreateDialog(sprintId: number): Observable<UserStory | undefined> {
    const dialogRef = this.dialog.open(CreateUserStoryDialogComponent, {
      width: '500px',
      data: { sprintId: sprintId }
    });

    return dialogRef.afterClosed();
  }

  openEditDialog(sprintId: number, userStory: UserStory): Observable<UserStory | undefined> {
    const dialogRef = this.dialog.open(CreateUserStoryDialogComponent, {
      width: '500px',
      data: { userStoryId: userStory.id, sprintId: sprintId }
    });

    return dialogRef.afterClosed();
  }
}
