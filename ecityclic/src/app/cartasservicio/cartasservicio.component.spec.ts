import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasservicioComponent } from './cartasservicio.component';

describe('CartasservicioComponent', () => {
  let component: CartasservicioComponent;
  let fixture: ComponentFixture<CartasservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartasservicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartasservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
