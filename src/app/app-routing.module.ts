import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TodosComponent } from './components/todos/todos.component';
import { AuthguardService } from './services/authGuardService/authguard.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';


const routes: Routes = [
  {path:"" , component:HomeComponent, },
  {path:"signup" , component:SignupComponent},
  {path:"login" , component:LoginComponent},
  {path:"logout" , component:HomeComponent, canActivate:[AuthguardService]},
  {path:"todos" , component:TodosComponent, canActivate:[AuthguardService]},
  {path:"**" , component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthguardService]
})
export class AppRoutingModule { }
