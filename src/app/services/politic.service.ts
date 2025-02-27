import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';
import { Politics } from '../cookies/interfaces/politics';

@Injectable({
  providedIn: 'root'
})
export class PoliticService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrlPolitics;

  getPolitic(): Observable<Politics[]> {
      return this.http.get<Politics[]>(this.apiUrl);
    }
  
    getPoliticById(id:number): Observable<Politics> {
      return this.http.get<Politics>(`${this.apiUrl}/${id}`);
    }
  
    createPolitic(cookie:Partial<Politics>): Observable<Politics> {
      return this.http.post<Politics>(this.apiUrl, cookie);
    }
  
    updatePolitic(id: number, politics: Partial<Politics>): Observable<Politics> {
      return this.http.put<Politics>(`${this.apiUrl}/${id}`, politics);
    }
    
  
    deletePolitic(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
}
