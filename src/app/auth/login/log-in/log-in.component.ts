import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginForm: FormGroup

  constructor(private authService: AuthService,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      nickName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  OnSubmit() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          localStorage.setItem('userId', JSON.stringify(user.id));
          this.authService.redirectToHome();
        },
        error: (error) => {
          // Maneja errores, como credenciales incorrectas o problemas de red
          console.error('Error en el login', error);

          Swal.fire({
            title: 'Error',
            text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar' // texto del botón de confirmación
          });
        }
      });
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
