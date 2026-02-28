import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Productservice } from '../service/productservice';
import { Product, ProductWithTotals } from '../models';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {
  private productService = inject(Productservice);
  private destroy$ = new Subject<void>();

  products: ProductWithTotals[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = this.calculateTotals(data);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load products';
          this.isLoading = false;
          console.error('Error loading products:', err);
        }
      });
  }

  calculateTotals(products: Product[]): ProductWithTotals[] {
    return products.map(product => ({
      ...product,
      total: product.qty * product.price,
      grandTotal: (product.qty * product.price) - (product.qty * product.price * (product.discount / 100))
    }));
  }

  get filteredProducts(): ProductWithTotals[] {
    if (!this.searchTerm) {
      return this.products;
    }
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p => 
      p.item.toLowerCase().includes(term) ||
      p.categoryid.toString().includes(term)
    );
  }

  onSearch(term: string): void {
    this.searchTerm = term;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.products = this.products.filter(p => p.productid !== id);
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.error = 'Failed to delete product';
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
