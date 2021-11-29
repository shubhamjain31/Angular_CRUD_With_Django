import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { GlobalConstantsComponent } from './common/global-constants/global-constants.component';
import { GalleryRestaurantComponent } from './restaurant/gallery-restaurant/gallery-restaurant.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { LoginGuard, AuthGuard } from './login/login.guard';
import { LoginResolver } from './resolvers/login.resolver';

import { AboutModule } from './modules/about.module';
import { HomeModule } from './modules/home.module';
import { HistoryModule } from './modules/history.module';
import { RatingModule } from './modules/rating.module';
import { RestaurantModule } from './modules/restaurant.module';
import { SharedModule } from './modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    GlobalConstantsComponent,
    GalleryRestaurantComponent,
    PageNotFoundComponent,
    UpgradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    
    AboutModule,
    HomeModule,
    HistoryModule,
    RatingModule,
    RestaurantModule,
    SharedModule,
  ],
  exports: [],
  providers: [LoginGuard, AuthGuard, LoginResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
