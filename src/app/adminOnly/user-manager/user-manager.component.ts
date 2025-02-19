import { Component, inject, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: any = null;
  searchEmail: string = '';
  newRole: string = '';
  currentUserID: string | null = null;
  private toastr = inject(ToastrService);

  constructor(private userService: UserService,private authService: AuthService) {}

  ngOnInit() {
    const claims = this.authService.getClaims();
    this.currentUserID = claims?.userID || null;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersForAdmin().subscribe({
      next: (data) => {
        this.users = data.filter(user => user.id !== this.currentUserID);
        this.filteredUsers = this.users;
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  filterUsers() {
    if (this.searchEmail) {
      this.filteredUsers = this.users.filter(user => 
        user.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }


  selectUser(user: any) {
    this.selectedUser = user;
    this.newRole = user.role;
  }
  

  updateUser() {
    if (!this.selectedUser || !this.newRole.trim()) {
      console.error('Datos incompletos para actualizar el usuario.');
      return;
    }

    this.userService.updateUser(this.selectedUser.email, this.newRole).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado con éxito.', 'Éxito');
        this.loadUsers();
        this.selectedUser = null;
      },
      error: (err) => {
        this.toastr.error('Error al actualizar el usuario.', 'Error');
        console.error('Error al actualizar el usuario:', err);
      }
    });
  }
  

  deleteUser(user: any) {
    if (confirm(`¿Seguro que deseas eliminar al usuario ${user.email}?`)) {
      this.userService.deleteUser(user.email).subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado correctamente', 'Éxito');
          this.users = this.users.filter(u => u.email !== user.email);
          this.loadUsers();
        },
        error: (err) => {
          this.toastr.error('Error al eliminar usuario', 'Error');
          console.error('Error al eliminar usuario', err);
        }
      });
    }
  }

  cancelEdit() {
    this.selectedUser = null;
    this.newRole = '';
  }
  
}
