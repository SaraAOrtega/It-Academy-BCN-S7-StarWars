import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    // Inicialización del formulario reactivo
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {}


  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Control 
  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }


  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
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
}
