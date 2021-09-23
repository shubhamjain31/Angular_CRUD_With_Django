import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    
    return this.authenticationService.is_logged_in().pipe(map((res: any) => {
         if(res['is_logged_in']){
          console.log('fjdjd')
            return false;
          }
          else{
            this.router.navigate(['home']);
            return true;
          }
       
      }));
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public authenticationService: AuthenticationService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

      return this.authenticationService.is_logged_in().pipe(map((res: any) => {
         if(res['is_logged_in']){
            return true;
          }
          else{
            this.router.navigate(['login']);
            return false;
          }
       
      }));

  }
}