import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { GlobalConstantsComponent } from './common/global-constants/global-constants.component';
import { LoginGuard, AuthGuard } from './login/login.guard';
import { AboutComponent } from './about/about.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';
import { DeleteRestaurantComponent } from './restaurant/delete-restaurant/delete-restaurant.component';
import { ShowRestaurantComponent } from './restaurant/show-restaurant/show-restaurant.component';
import { MenuRestaurantComponent } from './restaurant/menu-restaurant/menu-restaurant.component';
import { MenuAddEditRestaurantComponent } from './restaurant/menu-restaurant/menu-add-edit-restaurant/menu-add-edit-restaurant.component';
import { HistoryComponent } from './history/history.component';
import { FileSaverModule } from 'ngx-filesaver';
import { MatDialogModule } from '@angular/material/dialog';
import { GalleryRestaurantComponent } from './restaurant/gallery-restaurant/gallery-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    GlobalConstantsComponent,
    AboutComponent,
    RestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    DeleteRestaurantComponent,
    ShowRestaurantComponent,
    MenuRestaurantComponent,
    MenuAddEditRestaurantComponent,
    HistoryComponent,
    GalleryRestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    FileSaverModule,
    MatDialogModule,
    ToastrModule.forRoot({preventDuplicates: true}),
  ],
  exports: [],
  providers: [LoginGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
