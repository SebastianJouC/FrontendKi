import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cookies } from '../cookies/interfaces/cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrlCookies;

  getCookie(): Observable<Cookies[]> {
    return this.http.get<Cookies[]>(this.apiUrl);
  }

  getCookieById(id:number): Observable<Cookies> {
    return this.http.get<Cookies>(`${this.apiUrl}/${id}`);
  }

  createCookie(cookie:Partial<Cookies>): Observable<Cookies> {
    return this.http.post<Cookies>(this.apiUrl, cookie);
  }

  interseccionCookiesUsuario(preferenciasCookies: { userID: number; cookieId: number[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/InterseccionCookieUsuario`, preferenciasCookies);
  }
  
  getUserCookieConfiguration(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/UserConfiguration`);
  }
  

  updateFullCookie(id: number, cookies: Partial<Cookies>): Observable<Cookies> {
    return this.http.put<Cookies>(`${this.apiUrl}/update-cookie-full/${id}`, cookies);
  }
  

  deleteCookie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
