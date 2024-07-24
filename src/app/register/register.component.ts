import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
   
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {}


  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      group.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }
  
  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    if (!control) return false;
    return control.invalid && (control.dirty || control.touched || this.submitted);

  
  }
  
  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      this.markAllFieldsAsTouched(); 
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



