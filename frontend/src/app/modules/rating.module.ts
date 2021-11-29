import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingComponent } from '../rating/rating.component';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RatingModule { }
