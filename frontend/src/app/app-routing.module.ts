import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';
import { ShowRestaurantComponent } from './restaurant/show-restaurant/show-restaurant.component';
import { MenuRestaurantComponent } from './restaurant/menu-restaurant/menu-restaurant.component';

import { LoginGuard, AuthGuard } from './login/login.guard';

const routes: Routes = [
  { 
    path: 'home',  
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    component:AddRestaurantComponent,
    path:'add'
  },
  {
    component:EditRestaurantComponent, 
    path:'update/:id'
  },
  {
    component:ShowRestaurantComponent, 
    path:'show'
  },
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
  {
    component:MenuRestaurantComponent, 
    path:'menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
