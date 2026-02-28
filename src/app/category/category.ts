import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Categoryservice } from '../service/categoryservice';
import { CategoryModel } from '../models';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit, OnDestroy {
  private categoryService = inject(Categoryservice);
  private destroy$ = new Subject<void>();

  categories: CategoryModel[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;

    this.categoryService.getCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load categories';
          this.isLoading = false;
          console.error('Error loading categories:', err);
        }
      });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.categories = this.categories.filter(c => c.categoryid !== id);
          },
          error: (err) => {
            console.error('Error deleting category:', err);
            this.error = 'Failed to delete category';
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
