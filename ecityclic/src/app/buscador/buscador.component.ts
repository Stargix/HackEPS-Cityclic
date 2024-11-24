import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CsvService, Tramit } from '../services/csv.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: Tramit[] = [];
  allTramits: Tramit[] = [];

  constructor(private fb: FormBuilder, private csvService: CsvService) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit() {
    this.csvService.getTramits().subscribe({
      next: tramits => {
        this.allTramits = tramits;
        console.log('Trámites cargados:', this.allTramits.length);
      },
      error: error => {
        console.error('Error al cargar los trámites:', error);
      }
    });

    this.searchForm.get('searchQuery')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => this.performSearch(query));
  }

  onSubmit() {
    const query = this.searchForm.get('searchQuery')?.value;
    this.performSearch(query);
  }

  performSearch(query: string) {
    if (!query) {
      this.searchResults = [];
      return;
    }

    const terms = query.toLowerCase().split(',').map(term => term.trim());
    this.searchResults = this.allTramits.filter(tramit => 
      terms.every(term => tramit.Titol.toLowerCase().includes(term))
    );
  }
}

