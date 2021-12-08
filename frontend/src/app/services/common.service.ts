import { Injectable } from '@angular/core';
import{ GlobalConstantsComponent } from 'src/app/common/global-constants/global-constants.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  APIUrl = GlobalConstantsComponent.APIUrl;

  private httpOptions: any;
  private httpOptionsForRestFramework: any;

  constructor(private http:HttpClient, private cookieService:CookieService) {

    this.httpOptionsForRestFramework = {
      headers: new HttpHeaders({ 'x-csrftoken' : this.cookieService.get('csrftoken')}),
      withCredentials: true
    };
   }

  public createUser(data: any){
    return this.http.post(this.APIUrl + '/register/', data);
  }

  public addRestaurant(data: any){
    return this.http.post(this.APIUrl + '/add/restaurant/', data);
  }

  public showRestaurant(){
    return this.http.get(this.APIUrl + '/show/restaurant/');
  }

  public allRestaurant(dataTablesParameters:any, {}){
    return this.http.post(this.APIUrl + '/show/restaurant/', dataTablesParameters);
  }

  public deleteRestaurant(data:any){
    return this.http.post(this.APIUrl + '/delete/restaurant/', data);
  }

  public editRestaurant(id:any, data:any){
    return this.http.post(this.APIUrl + '/edit/restaurant/'+id, data);
  }

  public getCurrentData(id:any){
    return this.http.post(this.APIUrl + '/get/restaurant/'+id, {});
  }

  public addMenu(data:any){
    return this.http.post(this.APIUrl + '/add/menu/', data);
  }

  public updateMenu(data:any){
    return this.http.post(this.APIUrl + '/update/menu/', data);
  }

  public deleteMenu(data:any){
    return this.http.post(this.APIUrl + '/delete/menu/', data);
  }

  public getMenu(id:any){
    return this.http.get(this.APIUrl + '/get/menu/'+id);
  }

  public allHistory(){
    return this.http.post(this.APIUrl + '/history/', {});
  }

  public download_all_menus(id:any){
    return this.http.get(this.APIUrl + '/download/menu/'+id);
  }

  public upload_image(data:any){
    return this.http.post(this.APIUrl + '/add/image/', this.httpOptionsForRestFramework);
  }

  public get_images(id:any){
    return this.http.get(this.APIUrl + '/get/images/'+id, this.httpOptions);
  }

  public rating_restaurant(id: string, data:any){
    return this.http.post(this.APIUrl + '/rating/'+ id, data, this.httpOptionsForRestFramework);
  }

  public addressDetailForRestaurant(id: string, data:any){
    return this.http.post(this.APIUrl + '/address/details/'+ id, data, this.httpOptionsForRestFramework);
  }

  public getAddressDetail(id:string){
    return this.http.get(this.APIUrl + '/get/address/details/'+id, this.httpOptions);
  }

}
