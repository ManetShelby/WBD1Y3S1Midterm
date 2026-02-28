import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CategoryModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Categoryservice {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://autocoolkh.com/api/seteccategory';

  getCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCategoryById(id: number): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCategory(category: Partial<CategoryModel>): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.baseUrl, category).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(id: number, category: Partial<CategoryModel>): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseUrl}/${id}`, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching categories';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('CategoryService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
