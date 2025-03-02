import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CreateProductDto, Product } from '../../models/product.model';
import { ProductFactory } from '../../factories/product.factory';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private productFactory: ProductFactory;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.productFactory = new ProductFactory();
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http.get<Product[]>(`${this.apiUrl}/products`)
      .subscribe({
        next: (products) => {
          this.products = products;
          this.productsSubject.next([...this.products]);
        },
        error: (error) => {
          console.error('Error loading products:', error);
        }
      });
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  addProduct(productData: CreateProductDto): Observable<Product> {
    const product = this.productFactory.createProduct(productData);
    
    return this.http.post<Product>(`${this.apiUrl}/products`, product).pipe(
      tap(newProduct => {
        this.products.push(newProduct);
        this.productsSubject.next([...this.products]);
      }),
      catchError(error => {
        console.error('Error adding product:', error);
        return throwError(() => new Error('Failed to add product. Please try again.'));
      })
    );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product).pipe(
      tap(updatedProduct => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.productsSubject.next([...this.products]);
        }
      }),
      catchError(error => {
        console.error('Error updating product:', error);
        return throwError(() => new Error('Failed to update product. Please try again.'));
      })
    );
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`).pipe(
      tap(() => {
        this.products = this.products.filter(p => p.id !== id);
        this.productsSubject.next([...this.products]);
      }),
      catchError(error => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Failed to delete product. Please try again.'));
      })
    );
  }
} 