import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';

import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot({preventDuplicates: true}),
  ],
  exports: [
    CommonModule,
    NgbModule,

    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatButtonModule,

    HttpClientModule,
    HttpClientXsrfModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    FileSaverModule
  ]
})
export class SharedModule { }
