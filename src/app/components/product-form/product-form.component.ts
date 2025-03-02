import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CreateProductDto, Product } from '../../models/product.model';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() productToEdit: Product | null = null;
  @Output() addProduct = new EventEmitter<CreateProductDto>();
  @Output() updateProduct = new EventEmitter<{id: number, product: Partial<Product>}>();
  @Output() cancelEditEvent = new EventEmitter<void>();
  
  productForm: FormGroup;
  categories: Category[] = [];
  editMode = false;
  
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      categoryId: ['', Validators.required],
      image: ['https://picsum.photos/200']
    });
  }
  
  ngOnInit(): void {
    this.loadCategories();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && changes['productToEdit'].currentValue) {
      const product = changes['productToEdit'].currentValue;
      this.editMode = true;
      
      this.productForm.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        image: product.image
      });
    }
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      
      const productData = {
        ...formValue,
        categoryId: Number(formValue.categoryId)
      };
      
      if (this.editMode && this.productToEdit) {
        this.updateProduct.emit({
          id: this.productToEdit.id!,
          product: productData
        });
      } else {
        this.addProduct.emit(productData);
      }
      
      this.resetForm();
    }
  }
  
  cancelEdit(): void {
    this.resetForm();
    this.cancelEditEvent.emit();
  }
  
  private resetForm(): void {
    this.editMode = false;
    this.productToEdit = null;
    this.productForm.reset({
      title: '',
      price: '',
      description: '',
      categoryId: '',
      image: 'https://picsum.photos/200'
    });
  }
} 