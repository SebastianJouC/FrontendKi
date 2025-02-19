import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OcultarBotonesDirective } from '../../directives/ocultar-botones.directive';
import {claimReq} from '../../utils/claimReq-utils';
import { CookiesBannerComponent } from '../../cookies/components/cookies-banner/cookies-banner.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, CommonModule,OcultarBotonesDirective, CookiesBannerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  claimReq = claimReq;

  onLogout(){
    this.authService.deleteToken();
    this.router.navigateByUrl('');
  }

  showBanner(){
    this.authService.isLoggedIn();
  }
}
