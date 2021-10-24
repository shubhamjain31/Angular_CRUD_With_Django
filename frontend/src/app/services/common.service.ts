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
  private httpOptionsForRestFramework: any;

  constructor(private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    this.httpOptionsForRestFramework = {
      headers: new HttpHeaders({}),
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
    return this.http.get(this.APIUrl + '/show/restaurant/', this.httpOptions);
  }

  public allRestaurant(dataTablesParameters:any, {}){
    return this.http.post(this.APIUrl + '/show/restaurant/', dataTablesParameters, this.httpOptions);
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

  public addMenu(data:any){
    return this.http.post(this.APIUrl + '/add/menu/', data, this.httpOptions);
  }

  public updateMenu(data:any){
    return this.http.post(this.APIUrl + '/update/menu/', data, this.httpOptions);
  }

  public deleteMenu(data:any){
    return this.http.post(this.APIUrl + '/delete/menu/', data, this.httpOptions);
  }

  public getMenu(id:any){
    return this.http.get(this.APIUrl + '/get/menu/'+id, this.httpOptions);
  }

  public allHistory(){
    return this.http.post(this.APIUrl + '/history/', this.httpOptions);
  }

  public download_all_menus(id:any){
    return this.http.get(this.APIUrl + '/download/menu/'+id, this.httpOptions);
  }

  public upload_image(data:any){
    return this.http.post(this.APIUrl + '/add/image/', data, this.httpOptionsForRestFramework);
  }

  public get_images(id:any){
    return this.http.get(this.APIUrl + '/get/images/'+id, this.httpOptions);
  }

}
