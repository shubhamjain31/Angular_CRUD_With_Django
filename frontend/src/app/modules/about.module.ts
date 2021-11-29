import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from '../about/about.component';
import { LoginGuard } from '../login/login.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      component:AboutComponent, 
      path:'',
      canActivate: [LoginGuard]
    },
];


@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { 
  constructor(){
    console.log('about modeule loaded')
  }
}
