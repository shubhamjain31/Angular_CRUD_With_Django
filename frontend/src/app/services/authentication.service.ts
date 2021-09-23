import { Injectable } from '@angular/core';
import{ GlobalConstantsComponent } from 'src/app/common/global-constants/global-constants.component';

import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  APIUrl = GlobalConstantsComponent.APIUrl;

  private httpOptions: any;

  constructor(private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
   }

  public loginUser(data: any){
    return this.http.post(this.APIUrl + '/login/', data, this.httpOptions);
  }

  public is_logged_in() {
    return this.http.get(this.APIUrl + '/login_check/', this.httpOptions);
  }
  
}
