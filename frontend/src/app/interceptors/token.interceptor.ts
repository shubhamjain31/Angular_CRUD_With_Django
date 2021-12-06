import {  
  HttpRequest,  
  HttpHandler,  
  HttpEvent,  
  HttpInterceptor  
} from '@angular/common/http';  

import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()  
export class TokenInterceptor implements HttpInterceptor { 
 constructor(public authenticationService: AuthenticationService) {}  

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      
  //   request = request.clone({  
  //     setHeaders: {  
  //       // 'Content-Type': 'application/json'
  //     }  
  //   });    return next.handle(request);  
  }  
} 