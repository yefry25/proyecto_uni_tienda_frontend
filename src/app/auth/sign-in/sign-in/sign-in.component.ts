import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  registroForm: FormGroup

  constructor(private authService: AuthService,
    private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      nickName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  SignIn() {
    if (this.registroForm.valid) {

      this.authService.register(this.registroForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Usuario creado',
            text: `Usuario ha sido creada correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.authService.redirectToHome();
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: `Ocurrió un error al crear el usuario!`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      })
    }
    else{
      this.registroForm.markAllAsTouched();
    }
  }
}
