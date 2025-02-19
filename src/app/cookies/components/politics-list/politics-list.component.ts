import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PoliticService } from '../../../services/politic.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Politics } from '../../interfaces/politics';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-politics-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatIconModule],
  templateUrl: './politics-list.component.html',
  styleUrl: './politics-list.component.css'
})
export class PoliticsListComponent implements OnInit{
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private politicService = inject(PoliticService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  politics: WritableSignal<Politics[]> = signal<Politics[]>([]);
  displayedColumns: string[] = ["id", "title", "description", "actions"];
  dataSource = new MatTableDataSource<Politics>([]);

  ngOnInit(): void {
    this.loadPolitics();
  }

  loadPolitics() {
    this.politicService.getPolitic().subscribe({
      next: (politics) => {
        console.log('Datos recibidos desde la API:', politics);
        this.politics.set(politics);
        this.updateTableData();
      },
      error: (err) => {
        console.error('Error al cargar políticas:', err);
      }
    });
  }
  

  updateTableData(){
    this.dataSource.data = this.politics();
    this.dataSource.paginator = this.paginator;
  }

  navigateToForm(id?:number) {
    const path = id ? `/layout/edit/${id}` : '/layout/new';
    console.log(path);
    this.router.navigate([path]);
  }

  deletePolitic(id:number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result) {
        this.politicService.deletePolitic(id).subscribe(()=> {
          const updatePolitics = this.politics().filter((politic)=>politic.id !== id);
          this.politics.set(updatePolitics);
          this.updateTableData();
        })
      }
    })
  }
}
