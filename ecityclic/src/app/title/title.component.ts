import { Component } from '@angular/core';

@Component({
  selector: 'app-title',  // This matches what you use in app.component.html
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  title = 'Welcome to Ecityclic!';

  ngOnInit() {
    // Obtener los elementos del DOM
    const hamburgerMenu: HTMLElement | null = document.getElementById('hamburger-menu');
    const menu: HTMLElement | null = document.getElementById('menu');

    // Verificar si los elementos existen y agregar el evento
    if (hamburgerMenu && menu) {
      hamburgerMenu.addEventListener('click', () => {
        menu.classList.toggle('hidden'); // Alterna la clase 'hidden'
      });
    }
  }
}
