import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
//forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { PoliticService } from '../../../services/politic.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-politics-form',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './politics-form.component.html',
  styleUrl: './politics-form.component.css'
})
export class PoliticsFormComponent {
  private politicService = inject(PoliticService);
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar)

  politicForm:FormGroup;
  isEditMode:boolean = false;

  constructor() {
    this.politicForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['',[Validators.required, Validators.maxLength(5000)]]
    });

    this.route.params.subscribe((params) => {
      if(params['id']){
        this.isEditMode = true;
        this.loadProduct(params['id']);
      }
    });
  }

  private loadProduct(id:number){
    this.politicService.getPoliticById(id).subscribe({
      next:(politic) => {
        this.politicForm.patchValue(politic)
      },
      error:(err) => {
        console.error(err)
      }
    })
  }

  onSubmit() {
    if(this.politicForm.invalid) return;
    const politicData = {...this.politicForm.value};
    if(this.isEditMode) {
      this.politicService.updatePolitic(politicData.id, politicData).subscribe({
        next: () => {
          this.snackBar.open('Politic updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/cookies/politics-edit']);
        },
        error: (err) => console.error(err),
      });
    }else {
       delete politicData.id;
       this.politicService.createPolitic(politicData).subscribe({
         next: () => {
           this.snackBar.open('Politic added successfully!', 'Close', {
             duration: 3000,
           });
           this.router.navigate(['/cookies/politics-edit']);
         },
         error: (err) => console.error(err),
       });
    }
  }

}
