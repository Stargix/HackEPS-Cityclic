import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "./title/title.component";
import { SearchComponent } from "./buscador/buscador.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { EncabezadoComponent } from "./encabezado/encabezado.component";
import { CartasservicioComponent } from "./cartasservicio/cartasservicio.component";
import { HttpClientModule } from '@angular/common/http';
import { CsvService } from './services/csv.service';  // Asegúrate de que CsvService esté en los providers si es necesario

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CsvService],
  imports: [CommonModule, TitleComponent, SearchComponent, FooterComponent, LoginComponent, EncabezadoComponent,
     CartasservicioComponent,HttpClientModule ]
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
