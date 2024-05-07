import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TodosComponent } from './components/todos/todos.component';
import { DatePipe } from '@angular/common'

import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import { MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTodoComponent } from './components/todos/create-todo/create-todo.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoggedInNavigationComponent } from './components/todos/logged-in-navigation/logged-in-navigation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SingleTodoComponent } from './components/todos/single-todo/single-todo.component';
import { EditTodoComponent } from './components/todos/single-todo/edit-todo/edit-todo.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component'
import { AuthInterceptor } from './services/authInterceptorService/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    TodosComponent,
    CreateTodoComponent,
    ErrorPageComponent,
    LoggedInNavigationComponent,
    SingleTodoComponent,
    EditTodoComponent,
    SessionExpiredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [CookieService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  DatePipe,  {
    provide: MatDialogRef,
    useValue: {}
  },CreateTodoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
