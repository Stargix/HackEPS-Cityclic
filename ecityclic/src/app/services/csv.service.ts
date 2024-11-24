import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Tramit {
  Titol: string;
  // Añade aquí más campos según la estructura de tu CSV
}

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor(private http: HttpClient) {}

  getTramits(): Observable<Tramit[]> {
    console.log('Haciendo solicitud para obtener el archivo CSV...');

    return this.http.get('src/assets/tramits.csv', { responseType: 'text' })
      .pipe(
        map(csv => {
          console.log('CSV recibido:', csv); // Imprime el CSV tal como llega
          return this.parseCSV(csv);
        }),
        catchError(error => {
          console.error('Error fetching CSV:', error);
          return of([]); // Devuelve un array vacío en caso de error
        })
      );
  }

  private parseCSV(csv: string): Tramit[] {
    const lines = csv.split('\n');
    const result: Tramit[] = [];
    const headers = lines[0].split(',');

    console.log('Headers:', headers); // Imprime los encabezados del CSV

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(',');

      if (currentline.length === headers.length) {
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj as Tramit);
      }
    }

    console.log('Datos parseados:', result);
    return result;
  }
}
