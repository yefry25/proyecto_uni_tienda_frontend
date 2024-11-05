import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  credentials = {
    nickName: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  OnSubmit() {
    this.authService.login(this.credentials).subscribe({
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
}
