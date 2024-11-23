import { Component } from '@angular/core';
import { TitleComponent } from "./title/title.component";
import { BuscadorComponent } from "./buscador/buscador.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TitleComponent, BuscadorComponent]
})
export class AppComponent {
  title = 'ecityclic';
}
