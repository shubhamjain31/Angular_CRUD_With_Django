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
import { MenuAddEditRestaurantComponent } from './restaurant/menu-restaurant/menu-add-edit-restaurant/menu-add-edit-restaurant.component';
import { HistoryComponent } from './history/history.component';
import { GalleryRestaurantComponent } from './restaurant/gallery-restaurant/gallery-restaurant.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { RatingComponent } from './rating/rating.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginResolver } from './resolvers/login.resolver';


import { LoginGuard, AuthGuard } from './login/login.guard';

const routes: Routes = [
  { 
    path: 'home',  
    component: HomeComponent,
    canActivate: [LoginGuard],
    resolve: {
      is_logged_in: LoginResolver
    }
  },
  {
    component:AddRestaurantComponent,
    path:'add',
    canActivate: [LoginGuard]
  },
  {
    component:EditRestaurantComponent, 
    path:'update/:id',
    canActivate: [LoginGuard]
  },
  {
    component:ShowRestaurantComponent, 
    path:'show',
    canActivate: [LoginGuard]
  },
  {
    component:LoginComponent, 
    path:'login',
    canActivate: [AuthGuard]
  },
  {
    component:RegisterComponent, 
    path:'register',
    canActivate: [AuthGuard]
  },
  {
    component:LogoutComponent, 
    path:'logout',
    canActivate: [LoginGuard]
  },
  {
    component:HistoryComponent, 
    path:'history',
  },
  {
    component:RatingComponent, 
    path:'rating',
    canActivate: [LoginGuard]
  },
  {
    component:AboutComponent, 
    path:'about',
    canActivate: [LoginGuard]
  },
  {
    component:GalleryRestaurantComponent, 
    path:'gallery/:id',
    canActivate: [LoginGuard]
  },
  {
    component:MenuRestaurantComponent, 
    path:'menu',
    canActivate: [LoginGuard]
  },
  {
    component:MenuAddEditRestaurantComponent, 
    path:'add-menu/:id',
    canActivate: [LoginGuard]
  },
   { 
    path: 'upgrade',  
    component: UpgradeComponent,
    canActivate: [LoginGuard]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
