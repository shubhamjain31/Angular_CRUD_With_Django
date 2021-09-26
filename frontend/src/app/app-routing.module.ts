import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';

import { LoginGuard, AuthGuard } from './login/login.guard';

const routes: Routes = [
  { 
    path: 'home',  
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   component:AddRestaurantComponent , path:'add'
  // },
  // {
  //   component:UpdateRestaurantComponent, path:'update/:id'
  // },
  // {
  //   component:ListRestaurantComponent, path:'list'},
  {
    component:LoginComponent, 
    path:'login',
    canActivate: []
  },
  {
    component:RegisterComponent, 
    path:'register',
    // canActivate: [LoginGuard]
  },
  {
    component:LogoutComponent, 
    path:'logout',
    canActivate: [AuthGuard]
  },
  {
    component:AboutComponent, 
    path:'about',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
