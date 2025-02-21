import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = environment.apiUrlUsers;

  getUserProfile(){
    return this.http.get(this.apiUrl + '/userProfile');
  }

  getUsersForAdmin(){
    return this.http.get<any[]>(this.apiUrl + '/admin');
  }

  getUsersForPublic(){
    return this.http.get<any[]>(this.apiUrl + '/client');
  }

  updateUser(email: string, newRole: string) {
    const body = { email, newRole };
    return this.http.put(`${this.apiUrl}/admin/updateUserRole`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  
  
  deleteUser(email: string) {
    return this.http.delete(`${this.apiUrl}/admin/deleteUser/${email}`);
  }  
  
}
