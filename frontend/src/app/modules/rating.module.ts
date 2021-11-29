import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RatingComponent } from '../rating/rating.component';
import { SharedModule } from './shared.module';
import { LoginGuard } from '../login/login.guard';

const routes: Routes = [
   {
    component:RatingComponent, 
    path:'',
    canActivate: [LoginGuard]
  },
];



@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RatingModule { 
  constructor(){
    console.log('rate modeule loaded')
  }
}
