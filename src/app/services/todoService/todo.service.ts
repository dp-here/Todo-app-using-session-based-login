import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'http://localhost:3000/todos';

  httpOptions: { headers: HttpHeaders; withCredentials: boolean } = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  fetchAll() {
    return this.http
      .get(`${this.url}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  createTodo(todo: object) {
    return this.http
      .post(`${this.url}`, todo, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: number) {
    return this.http
      .delete(`${this.url}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateTodo(id: number, todo: object) {  
    return this.http
      .post(`${this.url}/${id}`, todo, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(errors: HttpErrorResponse) {
    if (errors.error instanceof ErrorEvent) {
      return throwError(
        () =>
          `An frontend error occured! Messsage: ${errors.error.msg} Status code ${errors.status}`
      );
    } else {
      return throwError(
        () =>
          `An backend error occured! Messsage: ${errors.error.errors[0].msg} Status code ${errors.status}`
      );
    }
  }
}
