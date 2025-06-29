import { Component, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from '../sprint-list/service/sprint.service';
import { Sprint } from '../../../../interfaces/sprint.interface';
import { MaterialModule } from '../../../../shared/material.module';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserStoryService } from './user-story/service/user-story.service';
import { UserStory } from '../../../../interfaces/user-story.interface';
import { MatAccordion } from '@angular/material/expansion';
import { UserStoryComponent } from './user-story/user-story.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { NoEntityFoundComponent } from '../../../no-entity-found/no-entity-found.component';
import { CreateUserStoryDialogService } from './user-story/create-user-story-dialog/create-user-story-dialog.service';

@Component({
  selector: 'app-sprint-details',
  standalone: true,
  imports: [
    MaterialModule, 
    UserStoryComponent, 
    CdkDropList, 
    CdkDrag,
    NoEntityFoundComponent
  ],
  templateUrl: './sprint-details.component.html',
  styleUrl: './sprint-details.component.scss',
  animations: [
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class SprintDetailsComponent {

  sprintId: number | null = null;
  sprint: Sprint | null = null;
  userStories: UserStory[] = [];

  isAllUserStoriesOpen: boolean = false;
  accordion = viewChild.required(MatAccordion);

  constructor(private route: ActivatedRoute, 
              private sprintService: SprintService,
              private userStoryService: UserStoryService,
              private createUserStoryDialogService: CreateUserStoryDialogService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.sprintId = params['sprintId'];
    });

    this.sprintService.getById(this.sprintId!).subscribe((sprint) => {
      this.sprint = sprint;
    });
    
    this.getUserStories();
  }

  getUserStories() {
    this.userStoryService.get(this.sprintId!, 0).subscribe((userStories) => {
      this.userStories = userStories.content.sort((a, b) => a.storyOrder - b.storyOrder);
    });
  }

  toggleAllUserStories() {
    this.isAllUserStoriesOpen = !this.isAllUserStoriesOpen;
    if (this.isAllUserStoriesOpen) {
      this.accordion().openAll();
    } 
    else {
      this.accordion().closeAll();
    }
  }

  drop(event: CdkDragDrop<UserStory[]>) {
    moveItemInArray(this.userStories, event.previousIndex, event.currentIndex);

    this.reOrderUserStories(this.userStories);
  }

  reOrderUserStories(userStories: UserStory[]) {
    userStories.forEach((userStory, index) => {
      userStory.storyOrder = index;
    });

    userStories.forEach((userStory) => {
      this.userStoryService.update(userStory.id!, userStory).subscribe({
        error: (error) => {
          this.getUserStories();
        }
      });
    });
  }

  openCreateUserStoryDialog() {
    this.createUserStoryDialogService.openCreateDialog(this.sprintId!).subscribe((userStory) => {
      if (userStory) {
        this.getUserStories()
      }
    });
  }

  updateUserStoryList() {
    this.getUserStories()
  }
}
