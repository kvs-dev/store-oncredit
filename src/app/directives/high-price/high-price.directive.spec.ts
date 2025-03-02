import { HighPriceDirective } from './high-price.directive';

describe('HighPriceDirective', () => {
  it('should create an instance', () => {
    const elementRef = { nativeElement: {} };
    const directive = new HighPriceDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
