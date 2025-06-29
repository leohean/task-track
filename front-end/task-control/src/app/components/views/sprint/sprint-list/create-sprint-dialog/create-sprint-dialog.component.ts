import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SprintService } from '../service/sprint.service';
import { Sprint } from '../../../../../interfaces/sprint.interface';
import { MaterialModule } from '../../../../../shared/material.module';

@Component({
  selector: 'app-create-sprint-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-sprint-dialog.component.html',
  styleUrl: './create-sprint-dialog.component.scss'
})
export class CreateSprintDialogComponent {
  sprintForm!: FormGroup;
  isEditMode: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    private sprintService: SprintService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { projectId?: number, sprintId?: number }
  ) { }

  ngOnInit() {
    this.sprintForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });

    if (this.data?.projectId && this.data?.sprintId) {
      this.isEditMode = true;
      this.loadSprint(this.data.sprintId);
    }
  }

  private loadSprint(sprintId: number) {
    console.log(sprintId)
    this.sprintService.getById(sprintId).subscribe((sprint) => {
      this.sprintForm.patchValue({
        name: sprint.name,
        description: sprint.description
      });
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.sprintForm.get(controlName);
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

  saveSprint() { 
    if (this.sprintForm.valid) {
      const sprint: Sprint = this.sprintForm.value;
      sprint.projectId = this.data.projectId!;

      const operation = this.isEditMode 
        ? this.sprintService.update(this.data.sprintId!, sprint)
        : this.sprintService.create(sprint);

      operation.subscribe(() => {
        const action = this.isEditMode ? 'atualizada' : 'criada';
        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        };
        this.snackBar.open(`Sprint "${sprint.name}" ${action} com sucesso!`, "", config);
        this.dialogRef.close(sprint);
      });
    }
  }
}
