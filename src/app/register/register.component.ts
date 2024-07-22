import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
   
    const formOptions: AbstractControlOptions = {
      validators: this.checkPasswords
    };

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, formOptions);
  }

  ngOnInit(): void {}


  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


  // Control 
  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched || this.submitted) : false;
  }


  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      this.markAllFieldsAsTouched(); // Marca todos los campos como tocados
      return;
    }

    
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
   
        this.router.navigate(['/home']);
      },
      error: (error) => {
 
        let errorMessage = 'Error desconocido';
        if (error.status === 400) {

          errorMessage = 'The user already exists. Please try with another email.';
        } 

        alert(errorMessage);
      }
    });
  }



    markAllFieldsAsTouched() {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }



