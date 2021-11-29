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
import { UpgradeComponent } from './upgrade/upgrade.component';

import { LoginGuard, AuthGuard } from './login/login.guard';
import { LoginResolver } from './resolvers/login.resolver';

import { SharedModule } from './modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    GlobalConstantsComponent,
    UpgradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    
    SharedModule,
  ],
  exports: [],
  providers: [LoginGuard, AuthGuard, LoginResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
