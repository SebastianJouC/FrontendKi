import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
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
}
