import { Component } from '@angular/core';
import { TitleComponent } from "./title/title.component";
import { SearchComponent } from "./buscador/buscador.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TitleComponent, SearchComponent]
})
export class AppComponent {
  title = 'ecityclic';
}
