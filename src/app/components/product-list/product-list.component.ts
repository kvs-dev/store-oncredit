import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { HighPriceDirective } from '../../directives/high-price/high-price.directive';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HighPriceDirective],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() deleteProduct = new EventEmitter<number>();
  @Output() editProduct = new EventEmitter<Product>();
  
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct.emit(id);
    }
  }
  
  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }
} 