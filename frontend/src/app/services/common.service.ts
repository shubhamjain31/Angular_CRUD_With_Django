import { Injectable } from '@angular/core';
import{ GlobalConstantsComponent } from 'src/app/common/global-constants/global-constants.component';

import {HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  APIUrl = GlobalConstantsComponent.APIUrl;

  private httpOptions: any;

  constructor(private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
   }

  public createUser(data: any){
    return this.http.post(this.APIUrl + '/register/', data, this.httpOptions);
  }
}
