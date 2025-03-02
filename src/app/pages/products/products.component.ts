import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Category, CreateProductDto, Product } from '../../models/product.model';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  categories: Category[] = [];
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  
  onAddProduct(productData: CreateProductDto): void {
    this.productService.addProduct(productData).subscribe({
      next: (product) => {
        console.log('Product added successfully:', product);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }
  
  onUpdateProduct(data: {id: number, product: Partial<Product> & {categoryId?: number}}): void {
    const categoryId = Number(data.product.categoryId);
    const category = this.categories.find(c => c.id === categoryId);
    
    if (!category) {
      console.error('Category not found');
      return;
    }
    
    const updatedProduct: Partial<Product> = {
      title: data.product.title,
      price: data.product.price,
      description: data.product.description,
      category: category,
      image: data.product.image
    };
    
    this.productService.updateProduct(data.id, updatedProduct).subscribe({
      next: (product) => {
        console.log('Product updated successfully:', product);
        this.selectedProduct = null;
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }
  
  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }
  
  onEditProduct(product: Product): void {
    this.selectedProduct = product;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onCancelEdit(): void {
    this.selectedProduct = null;
  }
} 