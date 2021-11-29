import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from '../history/history.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
   {
    component:HistoryComponent, 
    path:'',
  },
];

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HistoryModule {
  constructor(){
    console.log('history modeule loaded')
  }
 }
