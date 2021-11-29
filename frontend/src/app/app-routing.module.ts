import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


import { LoginGuard, AuthGuard } from './login/login.guard';

const routes: Routes = [
  
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
    path: 'upgrade',  
    component: UpgradeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'about',
    loadChildren: () => import(`./modules/about.module`).then(
      module => module.AboutModule
    )
  },
  {
    path: 'home',
    loadChildren: () => import(`./modules/home.module`).then(
      module => module.HomeModule
    )
  },
  {
    path: 'history',
    loadChildren: () => import(`./modules/history.module`).then(
      module => module.HistoryModule
    )
  },
  {
    path: 'rating',
    loadChildren: () => import(`./modules/rating.module`).then(
      module => module.RatingModule
    )
  },
  {
    path: '',
    loadChildren: () => import(`./modules/restaurant.module`).then(
      module => module.RestaurantModule
    )
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
