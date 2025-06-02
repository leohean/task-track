import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-user-story',
  standalone: true,
  imports: [MatExpansionModule, MaterialModule, CdkDropList, CdkDrag, TaskComponent],
  templateUrl: './user-story.component.html',
  styleUrl: './user-story.component.scss'
})
export class UserStoryComponent {

  @Input() userStory: UserStory | null = null;

  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private userStoryService: UserStoryService,
              private createUserStoryDialogService: CreateUserStoryDialogService,
              private createTaskDialogService: TaskDetailsDialogService
  ) { }

  ngOnInit() {
    this.todoTasks = this.userStory?.tasks.filter((task) => task.status === 'todo') || [];
    this.inProgressTasks = this.userStory?.tasks.filter((task) => task.status === 'in_progress') || [];
    this.doneTasks = this.userStory?.tasks.filter((task) => task.status === 'done') || [];
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

    this.reOrderTasks(this.todoTasks, TaskStatus.TODO);
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
      task.order = index;
      task.status = status;
    });
  }

  openEditUserStoryDialog() {
    this.createUserStoryDialogService.openEditDialog(this.userStory?.id!, this.userStory!).subscribe((userStory) => {
      if (userStory) {
        this.userStory = userStory;
      }
    });
  }

  openCreateTaskDialog() {
    this.createTaskDialogService.open(null).subscribe((task) => {});
  }
}