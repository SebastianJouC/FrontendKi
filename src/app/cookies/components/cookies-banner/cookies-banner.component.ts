import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookiesListComponent } from '../cookies-list/cookies-list.component';
import { Cookies } from '../../interfaces/cookies';
import { CookieService } from '../../../services/cookie.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
  private authService = inject(AuthService);


  cookies: WritableSignal<Cookies[]> = signal<Cookies[]>([]);

  ngOnInit() {
    const claims = this.authService.getClaims();
    if (!claims || !claims.userID) {
      console.warn('No se pudo obtener el userID del token.');
      return;
    }

    this.cookieService.getUserCookieConfiguration().subscribe({
      next: (config) => {
        if (config && config.length > 0) {
          this.isVisible = false;
        } else {
          this.loadCookies();
        }
      },
      error: (err) => {
        console.error('Error al obtener la configuración de cookies:', err);
        this.loadCookies();
      }
    });
  }

  loadCookies(): void {
    this.cookieService.getCookie().subscribe({
      next: (cookies) => {
        if (cookies && Array.isArray(cookies)) {
          this.cookies.set(cookies);
          this.isVisible = true;
        } else {
          console.warn('No se obtuvieron cookies válidas desde el servicio.');
        }
      },
      error: (err) => console.error('Error al cargar las cookies desde el servicio:', err)
    });
  }

  acceptAll(): void {
    this.updateCookies(true);
  }

  rejectNonNecessary(): void {
    this.updateCookies(false);
  }

  private updateCookies(acceptAll: boolean): void {
    const claims = this.authService.getClaims();
    const userID = claims?.userID;

    if (!userID) {
      console.warn('No se pudo obtener el userID del token.');
      return;
    }

    const updatedCookies = this.cookies().map(cookie => ({
      ...cookie,
      accepted: acceptAll ? true : cookie.required,
    }));

    const preferenciasCookies = {
      userID,
      cookieId: updatedCookies.map(cookie => cookie.id),
    };

    console.log('Enviando configuración a la API:', preferenciasCookies);

    this.cookieService.interseccionCookiesUsuario(preferenciasCookies).subscribe({
      next: () => {
        console.log('Cookies actualizadas correctamente en el backend.');
        this.hideBanner();
      },
      error: (err) => console.error('Error al actualizar las cookies:', err),
    });
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(CookiesListComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const claims = this.authService.getClaims();
        const userID = claims?.userID;
        if (!userID) {
          console.warn('No se pudo obtener el userID del token.');
          return;
        }
        const preferenciasCookies = {
          userID,
          cookieId: result.map((cookie: Cookies) => cookie.id)
        };

        this.cookieService.interseccionCookiesUsuario(preferenciasCookies).subscribe({
          next: () => {
            console.log('Configuración de cookies guardada desde el diálogo.');
            this.hideBanner();
          },
          error: (err) => console.error('Error al actualizar la configuración de cookies:', err),
        });
      }
    });
  }

  private hideBanner(): void {
    this.isVisible = false;
  }

  goToCookiesPolitics(): void {
    this.router.navigate(['/cookies/cookies-politics']);
  }

}
