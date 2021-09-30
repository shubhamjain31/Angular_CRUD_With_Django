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

  public addRestaurant(data: any){
    return this.http.post(this.APIUrl + '/add/restaurant/', data, this.httpOptions);
  }

  public showRestaurant(){
    return this.http.post(this.APIUrl + '/show/restaurant/', this.httpOptions);
  }

  public deleteRestaurant(data:any){
    return this.http.post(this.APIUrl + '/delete/restaurant/', data, this.httpOptions);
  }

  public editRestaurant(id:any, data:any){
    return this.http.post(this.APIUrl + '/edit/restaurant/'+id, data, this.httpOptions);
  }

  public getCurrentData(id:any){
    return this.http.post(this.APIUrl + '/get/restaurant/'+id, this.httpOptions);
  }

}
