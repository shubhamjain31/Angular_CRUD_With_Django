import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: '',  
    component: HomeComponent,
    // canActivate: []
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
    path:'login'
  },
  {
    component:RegisterComponent, 
    path:'register'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
