import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cookies-manager',
  imports: [CommonModule],
  templateUrl: './user-cookies-manager.component.html',
  styleUrl: './user-cookies-manager.component.css'
})
export class UserCookiesManagerComponent implements OnInit{

  users: any[] = [];
  constructor(private cookieService:CookieService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.cookieService.getUserCookieConfiguration().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Usuarios cargados:', data);
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }
}
