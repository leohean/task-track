import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../interfaces/task.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '../../../enums/task-status.enum';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Sprint } from '../../../interfaces/sprint.interface';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-details-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './task-details-dialog.component.html',
  styleUrl: './task-details-dialog.component.scss'
})
export class TaskDetailsDialogComponent {

  task: Task | null = null;
  selectedStatus: TaskStatus | null = null;
  userStoryId: number | null = null;
  taskForm!: FormGroup;
  isEditMode: boolean = false;

  isEditingTitle = false;

  statusesLabels = new Map<TaskStatus, string>([
    [TaskStatus.TO_DO, 'To Do'],
    [TaskStatus.IN_PROGRESS, 'In Progress'],
    [TaskStatus.DONE, 'Done'],
  ]);
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { userStoryId: number, task: Task, selectedStatus: TaskStatus | null }
  ) {
    this.userStoryId = data.userStoryId;
    this.task = data.task;
    this.selectedStatus = data.selectedStatus
    this.isEditingTitle = this.task ? false : true;
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: [this.task?.title, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [this.task?.description, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      estimatedTime: [this.task?.estimatedTime, [Validators.required, Validators.min(0)]],
      spentTime: [this.task?.spentTime, [Validators.required, Validators.min(0)]],
      responsibleUser: [this.task?.responsibleUser],
      status: [this.task?.status || this.selectedStatus, [Validators.required]],
    });

    if (this.data?.task) {
      this.isEditMode = true;
    }
  }

  editTitle() {
    this.isEditingTitle = !this.isEditingTitle;
  }

  save() {
    if (this.taskForm.valid) {  
      const formValue = this.taskForm.value;
      const task: Task = {
        ...formValue,
        estimatedTime: Number(formValue.estimatedTime),
        spentTime: Number(formValue.spentTime)
      };

      const operation = this.isEditMode 
        ? this.taskService.update(this.task?.id!, task)
        : this.taskService.create(this.userStoryId!, task);

      operation.subscribe(() => {
        const action = this.isEditMode ? 'atualizada' : 'criada';
        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        };
        this.snackBar.open(`Task "${task.title}" ${action} com sucesso!`, "", config);
        this.dialogRef.close(task);
      });
    }
  }
}
