import { Component } from '@angular/core';
import { TitleComponent } from "./title/title.component";
import { SearchComponent } from "./buscador/buscador.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TitleComponent, SearchComponent, FooterComponent]
})
export class AppComponent {
  title = 'ecityclic';
}
