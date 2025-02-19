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
import { AuthService } from '../../../services/auth.service';

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
  private authService = inject(AuthService);

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
    const claims = this.authService.getClaims();
    const userID = claims?.userID;
    const currentCookies = this.cookies();
    console.log('Claims obtenidos:', claims); // Verificar si userId está presente

    if (!claims || !claims.userID) {
      console.warn('No se pudo obtener el userId del token.');
      return;
    }
    
    if (!currentCookies || currentCookies.length === 0) {
      console.warn('No hay cookies válidas para guardar.');
      return;
    }
  
    // Simulación de userId, deberías obtenerlo de donde corresponda // O reemplázalo con el userId real del usuario autenticado
  
    const preferenciasCookies = {
      userID,
      cookieId: currentCookies.map(cookie => cookie.id) // Extraemos solo los IDs
    };
    console.log('Enviando datos a la API:', preferenciasCookies);
  
    this.cookieService.interseccionCookiesUsuario(preferenciasCookies).subscribe({
      next: () => {
        console.log('Cookies actualizadas correctamente en el backend.');
        this.dialogRef.close(currentCookies);
      },
      error: (err) => console.error('Error al actualizar las cookies:', err)
    });
  }
  
  onClose(): void {
    this.dialogRef.close();
  }

  goToCookiesPolitics(): void {
    this.router.navigate(['/cookies/cookies-politics']);
    this.dialogRef.close();
  }
}
