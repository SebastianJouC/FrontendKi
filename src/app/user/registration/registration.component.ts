import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../pipes/first-key.pipe';
import { strongPasswordValidator } from '../../CustomValidators/strong-password.validator';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule,FirstKeyPipe,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  isSubmitted:boolean = false;

  ngOnInit(): void {
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/dashboard');
  }

  passwordMatchValidator: ValidatorFn = (control:AbstractControl):null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({passwordMismatch:true})
    else
    confirmPassword?.setErrors(null)

    return null;
  }

  form = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), strongPasswordValidator()]],
    confirmPassword: ['']
  },{validators:this.passwordMatchValidator});

  onSubmit() {
    this.isSubmitted = true;
  
    // Solo intentamos enviar si el formulario es válido
    if (this.form.valid) {
      this.authService.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if(res.succeeded){
            this.form.reset();
            this.isSubmitted = false;
            this.toaster.success('Usuario creado exitosamente');
          }
        },
        error: err => {
          if (err.error.errors)
            err.error.errors.forEach((x: any) => {
              switch (x.code) {
                case "EmailYaExiste":
                  this.toaster.error('Email ya registrado', 'Registro Fallido')
                  break;

                default:
                  this.toaster.error('Contacte al desarrollador', 'Registro Fallido')
                  console.log(x);
                  break;
              }
            })
          else
            console.log('error:',err);
        }
      });
    }
  }
  

  hasDisplayableError(controlName:string):Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty));
  }
}
