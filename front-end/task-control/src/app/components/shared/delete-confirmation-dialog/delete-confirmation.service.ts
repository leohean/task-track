import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { DeleteConfirmationData } from '../../../interfaces/delete-confirmation-dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmationService {
  constructor(private dialog: MatDialog) { }

  confirm(data: DeleteConfirmationData): Observable<boolean> {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data
    });

    return dialogRef.afterClosed();
  }
} 