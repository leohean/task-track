import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../../../shared/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStory } from '../../../../../../interfaces/user-story.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: { userStoryId?: number, sprintId?: number }
  ) { }

  ngOnInit() {
    this.userStoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });

    if (this.data?.userStoryId && this.data?.sprintId) {
      this.isEditMode = true;
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.userStoryForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName === 'name' ? 'Nome' : 'Descrição'} é obrigatório`;
    }
    if (control?.hasError('minlength')) {
      return `${controlName === 'name' ? 'Nome' : 'Descrição'} deve ter no mínimo 3 caracteres`;
    }
    if (control?.hasError('maxlength')) {
      return `${controlName === 'name' ? 'Nome' : 'Descrição'} deve ter no máximo ${controlName === 'name' ? '50' : '255'} caracteres`;
    }
    return '';
  }

  saveUserStory() { 
    if (this.userStoryForm.valid) {
      console.log(this.userStoryForm.value);
      this.dialogRef.close(this.userStoryForm.value as UserStory);
    }
  }
}
