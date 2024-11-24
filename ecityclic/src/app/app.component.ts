import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "./title/title.component";
import { SearchComponent } from "./buscador/buscador.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule,TitleComponent, SearchComponent, FooterComponent, LoginComponent]
})
export class AppComponent {
  title = 'ecityclic';
  isLoggedIn = false;  // Inicialmente no logueado

  // Maneja el cambio de estado de login
  onLoginStatusChange(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  // Opción para cerrar sesión y volver a mostrar el login
  onLogout(): void {
    this.isLoggedIn = false;
  }
}
