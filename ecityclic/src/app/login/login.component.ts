import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginStatus = new EventEmitter<boolean>();  // Emitir estado de login al componente principal
  isLogin = true;  // Determina si estamos en modo login o registro
  email = '';
  password = '';
  confirmPassword = '';
  rememberMe = false;
  isLoggedIn = false;

  // Cambia el modo de login/registro
  toggleMode() {
    this.isLogin = !this.isLogin;
    this.isLoggedIn = false;  // Resetea el estado de login al cambiar de modo
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  // Llamado cuando el formulario es enviado
  onSubmit(): void {
    if (this.isLogin) {
      // Lógica de login
      this.isLoggedIn = true;
      this.loginStatus.emit(true);  // Emitir el estado a AppComponent
      console.log('Login:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
    } else {
      // Lógica de registro
      if (this.password !== this.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      this.isLoggedIn = true;
      this.loginStatus.emit(true);  // Emitir estado de login después del registro
      console.log('Register:', { email: this.email, password: this.password });
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    console.log('Forgot password clicked');
  }
}
