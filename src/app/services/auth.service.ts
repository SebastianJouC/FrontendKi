import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { TOKEN_KEY } from '../guarded/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrlUsers;

  createUser(formData: any){
    formData.role = "Cliente";
    return this.http.post(this.apiUrl+'/signup',formData)
  }

  signIn(formData: any){
    return this.http.post(this.apiUrl+'/signin',formData)
  }

  isLoggedIn(){
    return this.getToken() != null ? true : false;
  }

  saveToken(token: string){
    localStorage.setItem(TOKEN_KEY,token);
  }

  getToken(){
    return localStorage.getItem(TOKEN_KEY);
  }

  deleteToken(){
    localStorage.removeItem(TOKEN_KEY);
  }
}
