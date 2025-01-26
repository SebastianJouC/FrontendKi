import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
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

  updateCookie(id: number, updateDto: { accepted: boolean }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateDto);
  }

  updateFullCookie(id: number, cookies: Partial<Cookies>): Observable<Cookies> {
    return this.http.put<Cookies>(`${this.apiUrl}/${id}`, cookies);
  }
  

  deleteCookie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
