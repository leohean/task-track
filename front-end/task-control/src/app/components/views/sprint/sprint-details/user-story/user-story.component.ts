import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserStory } from '../../../../../interfaces/user-story.interface';
import { MaterialModule } from '../../../../../shared/material.module';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../../../interfaces/task.interface';
import { TaskComponent } from '../../../../task/task.component';
import { TaskStatus } from '../../../../../enums/task-status.enum';
import { UserStoryService } from './service/user-story.service';
import { CreateUserStoryDialogService } from './create-user-story-dialog/create-user-story-dialog.service';
import { TaskDetailsDialogService } from '../../../../task/task-details-dialog/task-details-dialog.service';
import { DeleteConfirmationService } from '../../../../shared/delete-confirmation-dialog/delete-confirmation.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-story',
  standalone: true,
  imports: [MatExpansionModule, MaterialModule, CdkDropList, CdkDrag, TaskComponent],
  templateUrl: './user-story.component.html',
  styleUrl: './user-story.component.scss'
})
export class UserStoryComponent implements OnChanges {

  @Input() userStory: UserStory | null = null;
  @Output() updateUserStoryList = new EventEmitter<void>();

  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  
  // Expor o enum para uso no template
  TaskStatus = TaskStatus;

  constructor(private userStoryService: UserStoryService,
              private createUserStoryDialogService: CreateUserStoryDialogService,
              private createTaskDialogService: TaskDetailsDialogService,
              private deleteConfirmationService: DeleteConfirmationService,
              private snackBarService: MatSnackBar
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userStory'] && this.userStory) {
      this.filterTasks();
    }
  }

  ngOnInit() {
    this.filterTasks();
  }

  filterTasks() {
    this.todoTasks = this.userStory?.tasks.filter((task) => task.status === 'TO_DO').sort((a, b) => a.taskOrder - b.taskOrder) || [];
    this.inProgressTasks = this.userStory?.tasks.filter((task) => task.status === 'IN_PROGRESS').sort((a, b) => a.taskOrder - b.taskOrder) || [];
    this.doneTasks = this.userStory?.tasks.filter((task) => task.status === 'DONE').sort((a, b) => a.taskOrder - b.taskOrder) || [];
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.reOrderTasks(this.todoTasks, TaskStatus.TO_DO);
    this.reOrderTasks(this.inProgressTasks, TaskStatus.IN_PROGRESS);
    this.reOrderTasks(this.doneTasks, TaskStatus.DONE);

    this.userStoryService.update(this.userStory?.id!, this.userStory!).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  reOrderTasks(tasks: Task[], status: TaskStatus) {
    tasks.forEach((task, index) => {
      task.taskOrder = index;
      task.status = status;
    });
  }

  openEditUserStoryDialog() {
    this.createUserStoryDialogService.openEditDialog(this.userStory?.id!, this.userStory!).subscribe((userStory) => {
      if (userStory) {
        this.userStory = userStory;
        this.updateUserStoryList.emit()
      }
    });
  }

  deleteUserStory() {
    console.log(this.userStory)
    this.deleteConfirmationService.confirm({
      title: 'Excluir User Story',
      message: `Tem certeza que deseja excluir a user story "${this.userStory?.title!}"?<br>Esta ação não pode ser desfeita.`
    }).subscribe(confirmed => {
      if (confirmed) {
        this.userStoryService.delete(this.userStory?.id!).subscribe((response) => {
          console.log(response);
          const config: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['success-snackbar']
          };
          this.updateUserStoryList.emit()
          this.snackBarService.open(`User Story "${this.userStory?.title!}" excluída com sucesso!`, "", config);
        });
      }
    });
  }

  openCreateTaskDialog(taskStatus: TaskStatus | null) {
    this.createTaskDialogService.open(this.userStory?.id!, null, taskStatus).subscribe((task) => {
      if (task) {
        this.updateUserStoryList.emit();
      }
    });
  }
}