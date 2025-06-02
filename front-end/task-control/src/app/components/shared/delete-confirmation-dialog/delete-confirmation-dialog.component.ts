import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationData } from '../../../interfaces/delete-confirmation-dialog.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteConfirmationData,
    private sanitizer: DomSanitizer
  ) {
    this.data.message = this.sanitizer.bypassSecurityTrustHtml(this.data.message) as string;
  }
}


