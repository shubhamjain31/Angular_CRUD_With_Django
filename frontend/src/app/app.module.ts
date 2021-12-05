import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

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

const CLIENT_ID = GlobalConstantsComponent.GOOGLE_API
const FB_ID     = GlobalConstantsComponent.FACBOOK_API
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
    SocialLoginModule,
    
    SharedModule,
  ],
  exports: [],
  providers: [LoginGuard, AuthGuard, LoginResolver,
  {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              FB_ID
            )
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
