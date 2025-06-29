import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { MaterialModule } from '../../shared/material.module';
import { TaskDetailsDialogService } from './task-details-dialog/task-details-dialog.service';
import { DeleteConfirmationService } from '../shared/delete-confirmation-dialog/delete-confirmation.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TaskService } from './service/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task: Task | null = null;
  @Input() userStoryId: number | null = null;
  @Output() updateUserStoryList = new EventEmitter<void>();

  constructor(private taskDetailsDialogService: TaskDetailsDialogService,
              private deleteConfirmationService: DeleteConfirmationService,
              private snackBarService: MatSnackBar,
              private taskService: TaskService
  ) { }

  getInitials(): string {
    /*const names = this.task?.responsibleUser?.name.split(' ') ?? [];
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();*/
    return "AB"
  }

  openTaskDetailsDialog() {
    if (this.task) {
      this.taskDetailsDialogService.open(this.userStoryId!, this.task, this.task.status).subscribe((task) => {
        if (task) {
          this.task = task
          this.updateUserStoryList.emit();
        }
      });
    }
  }

  deleteTask(event: Event) {
    event.stopPropagation();
    
    this.deleteConfirmationService.confirm({
      title: 'Excluir tarefa',
      message: `Tem certeza que deseja excluir o tarefa "${this.task?.title!}"?<br>Esta ação não pode ser desfeita.`
    }).subscribe(confirmed => {
      if (confirmed) {
        this.taskService.delete(this.task?.id!).subscribe((response) => {
          console.log(response);
          const config: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['success-snackbar']
          };
          this.snackBarService.open(`Tarefa "${this.task?.title!}" excluída com sucesso!`, "", config);
          this.updateUserStoryList.emit()
        });
      }
    });
  }
}
