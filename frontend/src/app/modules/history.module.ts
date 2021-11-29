import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryComponent } from '../history/history.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HistoryModule { }
