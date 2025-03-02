import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighPrice]',
  standalone: true
})
export class HighPriceDirective implements OnChanges {
  @Input() appHighPrice: number = 0;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighPrice']) {
      this.highlight();
    }
  }

  private highlight(): void {
    if (this.appHighPrice > 100) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    } else {
      this.el.nativeElement.style.backgroundColor = '';
    }
  }
} 