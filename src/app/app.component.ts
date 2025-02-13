import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CookiesBannerComponent } from "./cookies/components/cookies-banner/cookies-banner.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CookiesBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private routero = inject(Router);
  showButton = true;

  goToPoliticsEdit(): void {
    this.routero.navigate(['/cookies/politics-edit']);
  }

  goToCookiesEdit(): void {
    this.routero.navigate(['/cookies/cookies-edit']);
  }
  goToUsersRegistration(): void{
    this.routero.navigate(['/user/registration']);
  }
  
  goToUsersLogin(): void{
    this.routero.navigate(['/user/login']);
  }
  
  showCookieBanner = !localStorage.getItem('cookieConsent');
  onConsentGiven(consent: boolean) {
    if (consent) {
      localStorage.setItem('cookieConsent', 'true');
      this.showCookieBanner = false;
    }
  }

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscripción a eventos de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/') {  // Si estamos en la página principal
        document.body.classList.add('home');
        this.showButton = true;  // Mostrar el botón en la página principal
      } else {
        document.body.classList.remove('home');
        this.showButton = false;  // Ocultar el botón en otras páginas
      }
    });
  }


}
