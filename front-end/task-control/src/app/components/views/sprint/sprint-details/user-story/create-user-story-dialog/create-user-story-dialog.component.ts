import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../../../shared/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserStory } from '../../../../../../interfaces/user-story.interface';
import { UserStoryService } from '../service/user-story.service';

@Component({
  selector: 'app-create-user-story-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-user-story-dialog.component.html',
  styleUrl: './create-user-story-dialog.component.scss'
})
export class CreateUserStoryDialogComponent {
  userStoryForm!: FormGroup;
  isEditMode: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<CreateUserStoryDialogComponent>,
    private snackBar: MatSnackBar,
    private userStoryService: UserStoryService,
    @Inject(MAT_DIALOG_DATA) public data: { userStoryId?: number, sprintId?: number }
  ) { }

  ngOnInit() {
    this.userStoryForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });

    if (this.data?.userStoryId && this.data?.sprintId) {
      this.isEditMode = true;
      this.loadUserStory(this.data.userStoryId);
    }
  }

  private loadUserStory(userStoryId: number) {
    this.userStoryService.getById(userStoryId).subscribe((userStory) => {
      this.userStoryForm.patchValue({
        title: userStory.title,
        description: userStory.description
      });
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.userStoryForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName === 'title' ? 'Nome' : 'Descrição'} é obrigatório`;
    }
    if (control?.hasError('minlength')) {
      return `${controlName === 'title' ? 'Nome' : 'Descrição'} deve ter no mínimo 3 caracteres`;
    }
    if (control?.hasError('maxlength')) {
      return `${controlName === 'title' ? 'Nome' : 'Descrição'} deve ter no máximo ${controlName === 'name' ? '50' : '255'} caracteres`;
    }
    return '';
  }

  saveUserStory() { 
    if (this.userStoryForm.valid) {
      const userStory: UserStory = this.userStoryForm.value;
      userStory.sprintId = this.data.sprintId!;

      const operation = this.isEditMode 
        ? this.userStoryService.update(this.data.userStoryId!, userStory)
        : this.userStoryService.create(userStory);
      operation.subscribe(() => {
        const action = this.isEditMode ? 'atualizada' : 'criada';
        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        };
        this.snackBar.open(`User Story "${userStory.title}" ${action} com sucesso!`, "", config);
        this.dialogRef.close(userStory);
      });
    }
  }
}
