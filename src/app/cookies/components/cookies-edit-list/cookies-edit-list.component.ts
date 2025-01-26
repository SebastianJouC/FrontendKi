import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from '../../../services/cookie.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Cookies } from '../../interfaces/cookies';
import { ConfirmationDialogCookiesComponent } from '../confirmation-dialog-cookies/confirmation-dialog-cookies.component';

@Component({
  selector: 'app-cookies-edit-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './cookies-edit-list.component.html',
  styleUrl: './cookies-edit-list.component.css'
})
export class CookiesEditListComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private cookiesService = inject(CookieService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cookies: WritableSignal<Cookies[]> = signal<Cookies[]>([]);
  displayedColumns: string[] = ["id", "name", "description", "accepted","required", "actions"];
  dataSource = new MatTableDataSource<Cookies>([]);
  ngOnInit(): void {
    this.loadCookies();
  }

  loadCookies() {
    this.cookiesService.getCookie().subscribe({
      next: (cookies) => {
        console.log('Datos recibidos desde la API:', cookies);
        this.cookies.set(cookies);
        this.updateTableData();
      },
      error: (err) => {
        console.error('Error al cargar cookies:', err);
      }
    });
  }

  updateTableData(){
    this.dataSource.data = this.cookies();
    this.dataSource.paginator = this.paginator;
  }

  navigateToForm(id?:number) {
    const path = id ? `/cookies/editCookie/${id}` : '/cookies/newCookie';
    console.log(path);
    this.router.navigate([path]);
  }

  deleteCookie(id:number) {
    const dialogRef = this.dialog.open(ConfirmationDialogCookiesComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result) {
        this.cookiesService.deleteCookie(id).subscribe(()=> {
          const updatedCookies = this.cookies().filter((cookie)=>cookie.id !== id);
          this.cookies.set(updatedCookies);
          this.updateTableData();
        })
      }
    })
  }
}
