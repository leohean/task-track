import { Component, Inject, OnInit } from '@angular/core';
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
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user.interface';

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
export class TaskDetailsDialogComponent implements OnInit {

  task: Task | null = null;
  selectedStatus: TaskStatus | null = null;
  userStoryId: number | null = null;
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  projectUsers: User[] = [];
  currentUser: User | null = null;

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
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { userStoryId: number, task: Task, selectedStatus: TaskStatus | null }
  ) {
    this.userStoryId = data.userStoryId;
    this.task = data.task;
    this.selectedStatus = data.selectedStatus
    this.isEditingTitle = this.task ? false : true;
  }

  ngOnInit() {
    this.loadProjectUsers();
    this.setCurrentUser();
    this.initializeForm();
  }

  private loadProjectUsers() {
    // Extrair projectId da URL ou passar como parâmetro
    const projectId = this.extractProjectIdFromUrl();
    if (projectId) {
      this.userService.getUsersByProjectAsUser(projectId).subscribe({
        next: (users) => {
          this.projectUsers = users;
        },
        error: (error) => {
          console.error('Erro ao carregar usuários do projeto:', error);
        }
      });
    }
  }

  private setCurrentUser() {
    const token = this.authService.getToken();
    if (token) {
      const payload = this.authService.decodeToken(token);
      if (payload) {
        this.currentUser = {
          id: payload['userId'] || 0,
          name: payload['name'] || '',
          email: payload['email'] || '',
          username: payload['email'] || '',
          role: payload['role'] || 'USER',
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
          enabled: true
        };
      }
    }
  }

  private extractProjectIdFromUrl(): number | null {
    const url = window.location.pathname;
    const match = url.match(/\/projects\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  private initializeForm() {
    // Determinar o usuário responsável
    let responsibleUser = this.task?.responsible;
    if (!responsibleUser && this.currentUser) {
      responsibleUser = this.currentUser;
    }

    console.log(responsibleUser)

    this.taskForm = this.formBuilder.group({
      title: [this.task?.title, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [this.task?.description, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      estimatedTime: [this.task?.estimatedTime, [Validators.required, Validators.min(0)]],
      spentTime: [this.task?.spentTime, [Validators.required, Validators.min(0)]],
      responsible: [responsibleUser, [Validators.required]],
      status: [this.task?.status || this.selectedStatus, [Validators.required]],
    });

    if (this.data?.task) {
      this.isEditMode = true;
    }
  }

  compareUsers(user1: User | null, user2: User | null): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
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
