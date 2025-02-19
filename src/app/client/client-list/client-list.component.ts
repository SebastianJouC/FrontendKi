import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit{
  users: any[] = [];
  filteredUsers: any[] = [];
  searchEmail: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersForPublic().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data; // Inicializa filteredUsers con todos los usuarios al principio
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
      this.filteredUsers = this.users; // Si no hay texto de búsqueda, muestra todos los usuarios
    }
  }
}
