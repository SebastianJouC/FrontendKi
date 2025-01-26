import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { PoliticService } from '../../../services/politic.service';
import { Politics } from '../../interfaces/politics';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookies-politics',
  imports: [CommonModule],
  templateUrl: './cookies-politics.component.html',
  styleUrl: './cookies-politics.component.css'
})
export class CookiesPoliticsComponent {
  private router = inject(Router);
  private politicService = inject(PoliticService);
  politics: WritableSignal<Politics[]> = signal<Politics[]>([]);

  ngOnInit(): void {
    this.loadPolitics();
  }

  loadPolitics() {
    this.politicService.getPolitic().subscribe({
      next: (politics) => {
        console.log('Datos recibidos desde la API:', politics);
        this.politics.set(politics);
      },
      error: (err) => {
        console.error('Error al cargar políticas:', err);
      }
    });
  }


}
