import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddUsersDialogService, AddUsersDialogData, AddUsersDialogResult } from './add-users-dialog.service';
import { BasicUser } from '../../../../interfaces/basic-user';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-users-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './add-users-dialog.component.html',
  styleUrl: './add-users-dialog.component.scss'
})
export class AddUsersDialogComponent implements OnInit {
  
  searchControl = new FormControl('');
  availableUsers: BasicUser[] = [];
  selectedUsers: BasicUser[] = [];
  filteredUsers: Observable<BasicUser[]> = new Observable();
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<AddUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddUsersDialogData,
    private addUsersDialogService: AddUsersDialogService,
    private userService: UserService,
    private snackbarService: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAvailableUsers();
    this.setupAutocomplete();
  }

  private loadAvailableUsers() {
    this.isLoading = true;
    this.searchControl.disable();
    
    this.userService.getAllUsers().subscribe({
      next: (allUsers) => {
        this.availableUsers = allUsers.filter(user => 
          !this.data.currentUsers.some(currentUser => currentUser.userId === user.userId)
        );
        this.isLoading = false;
        this.searchControl.enable();
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.isLoading = false;
        this.searchControl.enable();
      }
    });
  }

  private setupAutocomplete() {
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || ''))
    );
  }

  private filter(value: string): BasicUser[] {
    const filterValue = value.toLowerCase();
    return this.availableUsers.filter(user => 
      user.userName.toLowerCase().includes(filterValue) ||
      user.userEmail.toLowerCase().includes(filterValue)
    );
  }

  onUserSelected(user: BasicUser) {
    if (!this.selectedUsers.some(selected => selected.userId === user.userId)) {
      this.selectedUsers.push(user);
    }
    this.searchControl.setValue('');
  }

  removeUser(user: BasicUser) {
    const index = this.selectedUsers.findIndex(u => u.userId === user.userId);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    }
  }

  removeCurrentUser(user: BasicUser) {
    this.userService.removeUsersFromProject(this.data.projectId, [user.userId]).subscribe({
      next: (response) => {
        console.log('Usuário removido com sucesso:', response);
        const currentUserIndex = this.data.currentUsers.findIndex(u => u.userId === user.userId);
        if (currentUserIndex > -1) {
          this.data.currentUsers.splice(currentUserIndex, 1);
        }
        
        if (!this.availableUsers.some(u => u.userId === user.userId)) {
          this.availableUsers.push(user);
        }
        
        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        };
        this.snackbarService.open(`Usuário removido com sucesso`, "", config);

        this.setupAutocomplete();
      },
      error: (error) => {
        console.error('Erro ao remover usuário do projeto:', error);
      }
    });
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.selectedUsers.length === 0) {
      return;
    }

    const userIds = this.selectedUsers.map(user => user.userId);
    
    this.userService.addUsersToProject(this.data.projectId, userIds).subscribe({
      next: (response) => {
        console.log('Usuários adicionados com sucesso:', response);
        const result: AddUsersDialogResult = {
          addedUsers: this.selectedUsers
        };

        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        };
        this.snackbarService.open(`Usuários adicionados com sucesso`, "", config);

        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Erro ao adicionar usuários ao projeto:', error);
        const result: AddUsersDialogResult = {
          addedUsers: this.selectedUsers
        };

        const config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['error-snackbar']
        };
        this.snackbarService.open(`Erro ao adicionar usuários. Tente novamente`, "", config);

        this.dialogRef.close(result);
      }
    });
  }
} 