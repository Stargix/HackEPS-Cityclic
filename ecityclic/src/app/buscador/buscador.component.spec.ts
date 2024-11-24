import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './buscador.component';
import { CsvService } from '../services/csv.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let csvServiceSpy: jasmine.SpyObj<CsvService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CsvService', ['getTramits']);

    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      providers: [
        { provide: CsvService, useValue: spy }
      ]
    }).compileComponents();

    csvServiceSpy = TestBed.inject(CsvService) as jasmine.SpyObj<CsvService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    csvServiceSpy.getTramits.and.returnValue(of([
      { Titol: 'Licencia de obra' },
      { Titol: 'Concurso público' },
      { Titol: 'Calendario fiscal' }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the search form', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm.get('searchQuery')).toBeDefined();
  });

  it('should perform search when form value changes', fakeAsync(() => {
    spyOn(component, 'performSearch');
    component.ngOnInit();
    component.searchForm.get('searchQuery')?.setValue('licencia');
    tick(400);
    expect(component.performSearch).toHaveBeenCalledWith('licencia');
  }));

  it('should filter results based on search query', () => {
    component.performSearch('Accions');
    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults[0].Titol).toBe('Accions per a la defensa dels drets humans, i en concret, dels drets humans de les dones, en cooperació al desenvolupament.');
  });

  it('should handle multiple search terms separated by commas', () => {
    component.performSearch('licencia, concurso');
    expect(component.searchResults.length).toBe(0);
  });

  it('should clear results when search query is empty', () => {
    component.performSearch('');
    expect(component.searchResults.length).toBe(0);
  });
});

