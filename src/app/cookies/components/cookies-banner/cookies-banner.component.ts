import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookiesListComponent } from '../cookies-list/cookies-list.component';
import { Cookies } from '../../interfaces/cookies';
import { CookieService } from '../../../services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookies-banner',
  imports: [],
  templateUrl: './cookies-banner.component.html',
  styleUrl: './cookies-banner.component.css'
})
export class CookiesBannerComponent implements OnInit {
  isVisible = false;
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  cookies: WritableSignal<Cookies[]> = signal<Cookies[]>([]);
  ngOnInit() {
    const cookiesConfig = localStorage.getItem('cookiesConfig');
    if (cookiesConfig) {
      this.cookies.set(JSON.parse(cookiesConfig)); // Inicializa las cookies desde localStorage
    } else {
      this.cookieService.getCookie().subscribe({
        next: (cookies) => {
          this.cookies.set(cookies); // Inicializa las cookies desde la base de datos
          setTimeout(() => {
            this.isVisible = true; // Mostrar el banner solo si no hay configuración previa
          }, 500);
        },
        error: (err) => console.error('Error al cargar las cookies desde el servicio:', err),
      });
    }
  }

  acceptAll(): void {
    const updatedCookies = this.cookies().map(cookie => ({
      ...cookie,
      accepted: true, // Aceptar todas las cookies
    }));
  
    // Guardar en localStorage
    this.saveCookies(updatedCookies);
  
    // Actualizar las cookies en la base de datos
    updatedCookies.forEach(cookie => {
      this.cookieService.updateCookie(cookie.id, { accepted: true }).subscribe({
        next: () => console.log(`Cookie con id ${cookie.id} actualizada correctamente.`),
        error: (err) => console.error(`Error al actualizar la cookie con id ${cookie.id}:`, err),
      });
    });
  
    // Actualizar la señal
    this.cookies.set(updatedCookies);
  
    console.log('Se aceptaron todas las cookies.');
    this.hideBanner();
  }
  


  rejectNonNecessary(): void {
    const updatedCookies = this.cookies().map(cookie => ({
      ...cookie,
      accepted: cookie.required, // Aceptar solo las obligatorias
    }));
  
    // Guardar en localStorage
    this.saveCookies(updatedCookies);
  
    // Actualizar las cookies en la base de datos
    updatedCookies.forEach(cookie => {
      this.cookieService.updateCookie(cookie.id, { accepted: cookie.required }).subscribe({
        next: () => console.log(`Cookie con id ${cookie.id} actualizada correctamente.`),
        error: (err) => console.error(`Error al actualizar la cookie con id ${cookie.id}:`, err),
      });
    });
  
    console.log('Se rechazaron las cookies no esenciales.');
    this.hideBanner();
  }
  

  openSettings(): void {
    const dialogRef = this.dialog.open(CookiesListComponent, {
      width: '400px', // Tamaño del diálogo
    });

    // Guardar configuración cuando el diálogo se cierre
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCookies(result);
        console.log('Configuración de cookies guardada desde el diálogo.');
        this.hideBanner();
      }
    });
  }

  private hideBanner(): void {
    this.isVisible = false; // Ocultar el banner
  }

  private saveCookies(cookies: Cookies[]): void {
    // Guardar configuración en localStorage
    localStorage.setItem('cookiesConfig', JSON.stringify(cookies));
    // Actualizar la señal
    this.cookies.set(cookies);
  }

  goToCookiesPolitics(): void {
    this.router.navigate(['/cookies/cookies-politics']);
  }

}
