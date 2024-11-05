import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  user = {
    FirstName: '',
    LastName: '',
    NickName: '',
    Password: '',
    Email: '',
    Address: '',
    PhoneNumber: 0,
    Active: 1
  }

  constructor(private authService: AuthService) { }

  SignIn() {
    console.log(this.user);

    this.authService.register(this.user).subscribe({
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
}
