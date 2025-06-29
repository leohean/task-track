import { Component } from '@angular/core';
import { CardComponent } from '../../../card/card.component';
import { PaginatorComponent } from '../../../paginator/paginator.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectDialogComponent } from '../../project/create-project-dialog/create-project-dialog.component';
import { Sprint } from '../../../../interfaces/sprint.interface';
import { SprintService } from './service/sprint.service';
import { DeleteConfirmationService } from '../../../shared/delete-confirmation-dialog/delete-confirmation.service';
import { CreateSprintDialogService } from './create-sprint-dialog/create-sprint-dialog.service';
import { NoEntityFoundComponent } from '../../../no-entity-found/no-entity-found.component';
import { MaterialModule } from '../../../../shared/material.module';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [
    CardComponent,
    PaginatorComponent,
    MaterialModule,
    NoEntityFoundComponent
  ],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss'
})
export class SprintComponent {
  protected Math = Math;
  protected currentPage: number = 1;
  protected sprints: Sprint[] = [];
  protected totalPages: number = 0;
  protected projectId: number | null = null;

  constructor(private sprintService: SprintService, 
              private dialog: MatDialog, 
              private snackBarService: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router,
              private deleteConfirmationService: DeleteConfirmationService,
              private createSprintDialog: CreateSprintDialogService
            ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
    this.getSprints(this.projectId!, this.currentPage);
  }

  onPageChange(page: number) {
    this.getSprints(this.projectId!, page);
  }

  private getSprints(projectId: number, page: number) {
    this.sprintService.get(projectId, page - 1).subscribe((sprints) => {
      this.sprints = sprints.content;
      this.totalPages = sprints.totalPages;
      this.currentPage = sprints.number + 1;
    });
  }

  openCreateSprintDialog() {
    this.createSprintDialog.openCreateDialog(this.projectId!).subscribe((sprint: Sprint | undefined) => {
      if (sprint) {
        this.onPageChange(this.currentPage);
      }
    });
  }

  accessSprint(sprint: Sprint) {
    this.router.navigate(['/projects', this.projectId, 'sprints', sprint.id]);
  }

  editSprint(sprint: Sprint) {
    this.createSprintDialog.openEditDialog(this.projectId!, sprint).subscribe((updatedSprint: Sprint | undefined) => {
      if (updatedSprint) {
        this.onPageChange(this.currentPage);
      }
    });
  }

  deleteSprint(sprint: Sprint) {
    this.deleteConfirmationService.confirm({
      title: 'Excluir sprint',
      message: `Tem certeza que deseja excluir a sprint "${sprint.name}"?<br>Esta ação não pode ser desfeita.`
    }).subscribe(confirmed => {
      if (confirmed) {
        this.sprintService.delete(sprint.id!).subscribe(() => {
          const config: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['success-snackbar']
          };
          this.snackBarService.open(`Sprint "${sprint.name}" excluída com sucesso!`, "", config);
          this.onPageChange(this.currentPage);
        });
      }
    });
  }
}
