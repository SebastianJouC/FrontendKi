import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  ngOnInit(): void {
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/dashboard');
  }

  isSubmitted:boolean = false;

  form = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required]
  })

  hasDisplayableError(controlName:string):Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty));
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.valid){
      this.authService.signIn(this.form.value).subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: err=>{
          if(err.status === 400)
            this.toaster.error('Correo o contraseña incorrectos','Inicio de sesión fallido');
          else
            console.log('error durante el inicio de sesion:\n,',err);
        }
      })
    }
  }
}
