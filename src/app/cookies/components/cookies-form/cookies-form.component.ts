import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
//forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { CookieService } from '../../../services/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-cookies-form',
  imports: [MatCheckboxModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './cookies-form.component.html',
  styleUrl: './cookies-form.component.css'
})
export class CookiesFormComponent {
  private cookieService = inject(CookieService);
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar)

  cookieForm:FormGroup;
  isEditMode:boolean = false;

  constructor() {
    this.cookieForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['',[Validators.required, Validators.maxLength(1000)]],
      accepted: [''],
      required: ['']
    });

    this.route.params.subscribe((params) => {
      if(params['id']){
        this.isEditMode = true;
        this.loadProduct(params['id']);
      }
    });
  }

  private loadProduct(id:number){
    this.cookieService.getCookieById(id).subscribe({
      next:(cookie) => {
        this.cookieForm.patchValue(cookie)
      },
      error:(err) => {
        console.error(err)
      }
    })
  }

  onSubmit() {
    if(this.cookieForm.invalid) return;
    const cookieData = {...this.cookieForm.value};
    console.log('Cookie Data:', cookieData);
    if(this.isEditMode) {
      console.log('Updating cookie...');
      this.cookieService.updateFullCookie(cookieData.id, cookieData).subscribe({
        next: () => {
          this.snackBar.open('Cookie updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/cookies/cookies-edit']);
        },
        error: (err) => console.error(err),
      });
    }else {
       delete cookieData.id;
       this.cookieService.createCookie(cookieData).subscribe({
         next: () => {
           this.snackBar.open('Cookie added successfully!', 'Close', {
             duration: 3000,
           });
           this.router.navigate(['/cookies/cookies-edit']);
         },
         error: (err) => console.error(err),
       });
    }
  }
}
