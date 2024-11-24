import { Component, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnDestroy {
  title = 'Welcome to Ecityclic!';

  @ViewChild('hamburgerMenu') hamburgerMenu!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  private listener!: () => void;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.listener = this.renderer.listen(this.hamburgerMenu.nativeElement, 'click', () => {
      this.menu.nativeElement.classList.toggle('hidden');
    });
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }

  
}
