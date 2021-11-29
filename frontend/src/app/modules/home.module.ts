import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';

import { LoginResolver } from '../resolvers/login.resolver';
import { LoginGuard } from '../login/login.guard';

const routes: Routes = [
   { 
    path: '',  
    component: HomeComponent,
    canActivate: [LoginGuard],
    resolve: {
      is_logged_in: LoginResolver
    }
  },
];



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeModule { 
  constructor(){
    console.log('home modeule loaded')
  }
}
