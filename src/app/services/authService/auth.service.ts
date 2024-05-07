import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../../models/User';
import { catchError, first, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  mailId!: Pick<User, 'email'>;
  sessionID!: string;
  private url = 'http://localhost:3000/auth';

  httpOptions: { headers: HttpHeaders; withCredentials?: boolean } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService
  ) {
   
  }

  signup(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        tap(() => {
          this.router.navigate(['login']);
        }),
        catchError(this.handleError)
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{ token: string }> {
    return this.http
      .post<{ token: string; mailId: Pick<User, 'email'> }>(
        `${this.url}/login`,
        { email: email, password: password },
        (this.httpOptions = {
          headers: this.httpOptions.headers,
          withCredentials: true,
        })
      )
      .pipe(
        first(),
        tap((tokenObject: { token: string; mailId: Pick<User, 'email'> }) => {
          this.mailId = tokenObject.mailId;
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['todos']);
        }),
        catchError((errors: HttpErrorResponse) => {
          let errorMessage: string;
          if (errors.error instanceof ErrorEvent) {
            errorMessage = `An error occured! Message: ${errors.error.message} Status code ${errors.status}`;
          } else {
            errorMessage = `An error occured! Message: ${errors.error.msg} Status code ${errors.status}`;
          }
          return throwError(errorMessage);
        })
      );
  }

  clearSession(): Observable<object> {
    return this.http
      .post(`${this.url}/clear-session`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          return throwError('Failed to clear session');
        })
      );
  }

  private handleError(errors: HttpErrorResponse) {
    if (errors.error instanceof ErrorEvent) {
      return throwError(
        () =>
          `Error occured! Messsage: ${errors.error.msg} Status code ${errors.status}`
      );
    } else {
      return throwError(
        () =>
          `Error occured! Messsage: ${errors.error.errors[0].msg} Status code ${errors.status}`
      );
    }
  }
}
