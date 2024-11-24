import { Component } from '@angular/core';
import { cards } from '../interfaces/cards';

@Component({
  selector: 'app-cartasservicio',
  standalone: true,
  imports: [],
  templateUrl: './cartasservicio.component.html',
  styleUrl: './cartasservicio.component.css',
})
export class CartasservicioComponent {
  servicios: cards[] = [
    {
      id: 1,
      nombre: 'Realitzar un tràmit',
      descripcion: 'Descripción del elemento 1',
      img: '<img src="https://picsum.photos/id/1076/600/400" alt="">',
    },
    {
      id: 2,
      nombre: 'Demanar cita prèvia',
      descripcion: 'Descripción del elemento 2',
      img: '<img src="https://picsum.photos/id/1076/600/400" alt="">',
    },
    {
      id: 3,
      nombre: 'Llistat de tràmits',
      descripcion: 'Descripción del elemento 3',
      img: '<img src="https://picsum.photos/id/1076/600/400" alt="">',
    },
    {
      id: 4,
      nombre: 'Accedir al teu espai',
      descripcion: 'Descripción del elemento 4',
      img: '<img src="https://picsum.photos/id/1076/600/400" alt="">',
    },
  ];
}
