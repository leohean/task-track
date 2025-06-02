import { Component } from '@angular/core';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { CardComponent } from '../../card/card.component';
import { Project } from '../../../interfaces/project.interface';
import { ProjectService } from './service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteConfirmationService } from '../../shared/delete-confirmation-dialog/delete-confirmation.service';
import { CreateProjectDialogService } from './create-project-dialog/create-project-dialog.service';
import { NoEntityFoundComponent } from '../../no-entity-found/no-entity-found.component';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CardComponent,
    PaginatorComponent,
    MaterialModule,
    NoEntityFoundComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  protected Math = Math;
  protected currentPage: number = 1;
  protected projects: Project[] = [];
  protected totalPages: number = 0;

  constructor(
    private projectService: ProjectService,
    private snackBarService: MatSnackBar,
    private router: Router,
    private deleteConfirmationService: DeleteConfirmationService,
    private createProjectDialog: CreateProjectDialogService
  ) { }

  ngOnInit() {
    this.getProjects(this.currentPage);
  }

  onPageChange(page: number) {
    this.getProjects(page);
  }

  openCreateProjectDialog() {
    this.createProjectDialog.openCreateDialog().subscribe((project: Project | undefined) => {
      if (project) {
        this.onPageChange(this.currentPage);
      }
    });
  }

  accessProject(project: Project) {
    this.router.navigate(['/projects', project.id, 'sprints']);
  }

  editProject(project: Project) {
    this.createProjectDialog.openEditDialog(project).subscribe((updatedProject: Project | undefined) => {
      if (updatedProject) {
        this.onPageChange(this.currentPage);
      }
    });
  }

  deleteProject(project: Project) {
    this.deleteConfirmationService.confirm({
      title: 'Excluir projeto',
      message: `Tem certeza que deseja excluir o projeto "${project.name}"?<br>Esta ação não pode ser desfeita.`
    }).subscribe(confirmed => {
      if (confirmed) {
        this.projectService.delete(project.id!).subscribe(() => {
          const config: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['success-snackbar']
          };
          this.snackBarService.open(`Projeto "${project.name}" excluído com sucesso!`, "", config);
          this.onPageChange(this.currentPage);
        });
      }
    });
  }

  private getProjects(page: number) {
    let offset: number = (page - 1) * 8;
    this.projectService.get().subscribe((projects) => {
      this.projects = projects.slice(offset, offset + 8);
      this.totalPages = Math.ceil(projects.length / 8);
      this.currentPage = page;
    });
  }
}
