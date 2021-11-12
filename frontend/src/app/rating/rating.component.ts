import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../services/common.service';

export interface PeriodicElement {
  remove_col(fields: any): any;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  public restaurant_list:any = [];

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
    this.commonservice.showRestaurant().subscribe((data:any) => {
      if(data['success']){
        this.restaurant_list = data['all_restaurant'];
        this.remove_col();
        this.rating_to_review();
      }
    });
  }

  displayedColumns: any[] = ['position', 'name', 'rating', 'review'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  remove_col(){
    var restaurant_array = JSON.parse(JSON.stringify(this.restaurant_list));
    for(let i in restaurant_array) {
       delete restaurant_array[i].model;
       delete restaurant_array[i].pk;
    }
    return restaurant_array;
  }

  rating_to_review(){

    let restaurant_arr = this.remove_col();
    
    for(let i=0; i<restaurant_arr.length; i++){
      if(restaurant_arr[i].review === 1){
        restaurant_arr[i].rating= restaurant_arr[i].review;
        restaurant_arr[i]['review'] = "Poor"
      }
      else if(restaurant_arr[i].review === 2){
        restaurant_arr[i].rating= restaurant_arr[i].review;
        restaurant_arr[i]['review'] = "Below Average"
      }
      else if(restaurant_arr[i].review === 3){
        restaurant_arr[i].rating= restaurant_arr[i].review;
        restaurant_arr[i]['review'] = "Average"
      }
      else if(restaurant_arr[i].review === 4){
        restaurant_arr[i].rating= restaurant_arr[i].review;
        restaurant_arr[i]['review'] = "Above Average"
      }
      else if(restaurant_arr[i].review === 5){
        restaurant_arr[i].rating= restaurant_arr[i].review;
        restaurant_arr[i]['review'] = "Excellent"
      }
      else{
        restaurant_arr[i]['review'] = "--"
      }
    }

    this.dataSource.data = restaurant_arr;
  }

}
