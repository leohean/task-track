import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../interfaces/task.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '../../../enums/task-status.enum';

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
  taskForm!: FormGroup;

  isEditingTitle = false;

  statusesLabels = new Map<TaskStatus, string>([
    [TaskStatus.TODO, 'To Do'],
    [TaskStatus.IN_PROGRESS, 'In Progress'],
    [TaskStatus.DONE, 'Done'],
  ]);
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = data.task;
    this.isEditingTitle = this.task ? false : true;
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: [this.task?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [this.task?.description, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      estimatedTime: [this.task?.estimatedTime, [Validators.required, Validators.min(0)]],
      spentTime: [this.task?.spentTime, [Validators.required, Validators.min(0)]],
      responsibleUser: [this.task?.responsibleUser, [Validators.required]],
      status: [this.task?.status, [Validators.required]],
    });
  }

  editTitle() {
    this.isEditingTitle = !this.isEditingTitle;
  }

  save() {
    console.log(this.taskForm.value);
  }
}
