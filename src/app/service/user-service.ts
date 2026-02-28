import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://autocoolkh.com/api/setecusers';

  getUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: Partial<UserModel>): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: Partial<UserModel>): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching users';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('UserService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
