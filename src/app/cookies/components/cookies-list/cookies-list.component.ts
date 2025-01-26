import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild,WritableSignal, signal, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogContent,MatDialogTitle, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from '../../../services/cookie.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Cookies } from '../../interfaces/cookies';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookies-list',
  imports: [CommonModule, MatDialogModule,MatTableModule,MatPaginatorModule, MatSlideToggleModule,FormsModule,MatDialogTitle,MatDialogContent,MatIconModule,MatSlideToggleModule],
  templateUrl: './cookies-list.component.html',
  styleUrl: './cookies-list.component.css'
})
export class CookiesListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CookiesListComponent>) {}

  private dialog = inject(MatDialog);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cookies: WritableSignal<Cookies[]> = signal<Cookies[]>([]);
  displayedColumns: string[] = ["name","description","actions"];
  dataSource = new MatTableDataSource<Cookies>([]);

  ngOnInit(): void {
      this.loadCookies();
  }

  loadCookies() {
    this.cookieService.getCookie().subscribe({
      next: (cookies) => {
        if (cookies && Array.isArray(cookies)) {
          this.cookies.set(cookies);
          this.updateTableData();
        } else {
          console.warn('No se obtuvieron cookies válidas del servicio.');
        }
      },
      error: (err) => {
        console.error('Error al cargar las cookies:', err);
      },
    });
  }
  

  updateTableData(){
    this.dataSource.data = this.cookies();
    this.dataSource.paginator = this.paginator;
  }

  onSave(): void {
    const currentCookies = this.cookies();
    if (!currentCookies || currentCookies.length === 0) {
      console.warn('No hay cookies válidas para guardar.');
      return;
    }
  
    currentCookies.forEach(cookie => {
      this.cookieService.updateCookie(cookie.id, { accepted: cookie.accepted }).subscribe({
        next: () => console.log(`Cookie con id ${cookie.id} actualizada correctamente.`),
        error: (err) => console.error(`Error al actualizar la cookie con id ${cookie.id}:`, err)
      });
    });
  
    localStorage.setItem('cookiesConfig', JSON.stringify(currentCookies));
    console.log('Configuración de cookies guardada en localStorage:', currentCookies);
    this.dialogRef.close(currentCookies);
  }
  
  onClose(): void {
    this.dialogRef.close();
  }

  goToCookiesPolitics(): void {
    this.router.navigate(['/cookies/cookies-politics']);
    this.dialogRef.close();
  }
}
