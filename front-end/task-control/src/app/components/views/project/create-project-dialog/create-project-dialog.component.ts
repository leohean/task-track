import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ProjectService } from '../service/project.service';
import { MaterialModule } from '../../../../shared/material.module';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { projectId?: number }
  ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });

    if (this.data?.projectId) {
      this.isEditMode = true;
      this.loadProject(this.data.projectId);
    }
  }

  private loadProject(id: number) {
    this.projectService.getById(id).subscribe((project) => {
      this.projectForm.patchValue({
        name: project.name,
        description: project.description
      });
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.projectForm.get(controlName);
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

  saveProject() { 
    if (this.projectForm.valid) {
      const operation = this.isEditMode 
        ? this.projectService.update(this.data.projectId!, this.projectForm.value)
        : this.projectService.create(this.projectForm.value);

      operation.subscribe((project) => {
        const action = this.isEditMode ? 'atualizado' : 'criado';
        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        };
        this.snackBar.open(`Projeto "${project.name}" ${action} com sucesso!`, "", config);
        this.dialogRef.close(project);
      });
    }
  }
}
